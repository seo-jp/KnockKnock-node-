const pool = require('../data/pool')
const commonQuery = require('../data/commonQuery')



exports.getCategory = async () => {
    try {
        let data = await pool.query(commonQuery.getCategory)
        return data[0]
    } catch (err) {
        console.log(err)
        throw Error(err)
    }
}

exports.getCategoryByName = async (ctgCategory) => {
    try {
        let data = await pool.query(commonQuery.getCategoryByName, [ctgCategory])
        return data[0]
    } catch (err) {
        console.log(err)
        throw Error(err)
    }
}

exports.getKeyword = async () => {
    try {
        let data = await pool.query(commonQuery.getKeyword)
        return data[0]
    } catch (err) {
        console.log(err)
        throw Error(err)
    }
}

exports.getKeywordByName = async (keyword) => {
    try {
        let data = await pool.query(commonQuery.getKeywordByName, [keyword])
        return data[0]
    } catch (err) {
        console.log(err)
        throw Error(err)
    }
}

// validation

exports.dupliIdCheck = async (userId) => {
    try {
        let data = await pool.query(commonQuery.dupliIdCheck, [userId])
        return data[0]
    } catch (err) {
        console.log(err)
        throw Error(err)
    }
}

exports.dupliPhoneCheck = async (phone) => {
    try {
        let data = await pool.query(commonQuery.dupliPhoneCheck, [phone])
        return data[0]
    } catch (err) {
        console.log(err)
        throw Error(err)
    }
}

exports.dupliMailCheck = async (mail) => {
    try {
        let data = await pool.query(commonQuery.dupliMailCheck, [mail])
        return data[0]
    } catch (err) {
        console.log(err)
        throw Error(err)
    }
}
