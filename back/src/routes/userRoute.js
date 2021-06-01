var express = require('express')
var router = express.Router()
const userController = require('../controller/userController')

// join
router.post('/join', userController.join)
// login
router.post('/login', userController.login)

module.exports = router