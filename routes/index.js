const express = require('express')
const router = express.Router()

const emailController = require('../controllers/email')

router.get('/', emailController.home)
router.post('/send-email', emailController.email)

module.exports = router