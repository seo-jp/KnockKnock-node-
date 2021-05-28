const pool = require('../data/pool')
const userQuery = require('../data/userQuery')

exports.join = async (userInfo) => {
    try {
        //user_idx > user_id > user_name > user_pwd > user_birth > user_tel > user_email > user_photo
        //user_create > user_mstate
        console.log(userInfo.basic.name + ": 이름")
        // const info = [userInfo.basic.userId, userInfo.basic.name, userInfo.basic.password, '', userInfo.basic.phone,
        //               userInfo.basic.email, profile.imageUrl, ]
        //const infos = [userInfo.basic.]
        //let data = await pool.query(userQuery.join,[])
        return 1
    } catch (err) {
        console.log(err)
        throw Error(err)
    }
}
