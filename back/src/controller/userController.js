//const userService = require('../service/userService')
const commonService = require('../service/commonService')

exports.join = async (req, res, next) => {
    try {
        let images = req.body.profile.file
        //for(var i in req.body.keyList) images.push(req.body.keyList[i].imageUrl)
        let rs = await commonService.uploadImage(images)
        console.log(rs)
        //let rows = await userService.join(req.body)
        return res.json(1)
    } catch (err) {
        return res.status(500).json(err)
    }
}