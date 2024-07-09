const express=require('express')
const {getUser, loginUser, registerUser} = require("../controllers/userControllers")
const {chkTokenExists, verifyToken} = require("../middleware/authMiddleware")
const router = express.Router()

router.post('/login', loginUser)

router.post('/register', registerUser)

router.get('/api/user' , chkTokenExists, verifyToken, getUser)

module.exports = router;
