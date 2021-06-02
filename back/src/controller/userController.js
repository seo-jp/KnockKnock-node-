const pool = require('../data/pool')
const userQuery = require('../data/userQuery')
const crypto = require('crypto')

//join ----------------------------------------------------------------------------------------
//password 암호화 (Author: zini)
const createSalt = () =>
    new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if (err) reject(err)
            resolve(buf.toString('base64'))
        })
    })

const createHashedPassword = (password) =>
    new Promise(async (resolve, reject) => {
        const salt = await createSalt()
        crypto.pbkdf2(password, salt, 9999, 64, 'sha512', (err, key) => {
            if (err) reject(err)
            resolve({ password: key.toString('base64'), salt })
        })
    })

exports.join = async (req, res, next) => {
    try {
        const basic = req.body.basic
        const profile = req.body.profile
        const key = req.body.keyList

        const hashed = await createHashedPassword(basic.password)    
        const info = [basic.userId, basic.name, hashed.password, hashed.salt, basic.phone,
                      basic.email,profile.fileName]

        // basic 정보 저장              
        await pool.query(userQuery.join,info,(error,results) => {
            if (error) return res.json({ error: error })
        })

        // kwd 저장
        const data = await pool.query(userQuery.getUserIdx,[basic.userId])
        let userIdx = Object.values(JSON.parse(JSON.stringify(data[0])))[0].userIdx
        
        let kwds = []
        for(var i in key){
            kwds[i] = [userIdx,key[i].keyId,key[i].id,key[i].feedText,key[i].fileName]
            await pool.query(userQuery.saveKwd,kwds[i],(error,results) => {
                if (error) return res.json({ error: error })
            })
        }
  
    } catch (err) {
        return res.status(500).json(err)
    }
}

//login ----------------------------------------------------------------------------------------'


const makePasswordHashed = async (userId, password) =>
    new Promise(async (resolve, reject) => {
        const data = await pool.query(userQuery.getSalt,[userId])
        
        if(data[0].length > 0){
            const salt = Object.values(JSON.parse(JSON.stringify(data[0])))[0].userSalt
            crypto.pbkdf2(password, salt, 9999, 64, 'sha512', (err, key) => {
                if (err) reject(err)
                resolve(key.toString('base64'))
            })
        } else resolve(null)
    })

exports.login = async (req, res, next) => {
    try {
        const userId = req.body.userInfo.userId
        const password = req.body.userInfo.password

        const Hashedpassword = await makePasswordHashed(userId,password)
        if(Hashedpassword == null) return res.json({ msg : 'ID가 존재하지 않습니다' , success : false })

        let data = await pool.query(userQuery.login, [userId,Hashedpassword])
        if(data[0].length > 0) return res.json({ success : true })
        else return res.json({ msg : '올바른 비밀번호가 아닙니다' , success : false })

    } catch (err) {
        return res.status(500).json(err)
    }
}