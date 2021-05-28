var express = require('express')
var router = express.Router()
const commonController = require('../controller/commonController')




//get category && keyword
router.get('/category', commonController.getCategory)
router.get('/category/:ctgCategory', commonController.getCategoryByName)
router.get('/keyword', commonController.getKeyword)
router.get('/keyword/:keyword', commonController.getKeywordByName)

// id phone mail 중복체크
router.get('/validate/dupliIdChk/:userId', commonController.dupliIdCheck)
router.get('/validate/dupliPhoneChk/:phone', commonController.dupliPhoneCheck)
router.get('/validate/dupliMailChk/:mail', commonController.dupliMailCheck)

//file upload
router.post('/fileUpload',commonController.fileUpload)
router.post('/fileUploads',commonController.fileUploads)


module.exports = router