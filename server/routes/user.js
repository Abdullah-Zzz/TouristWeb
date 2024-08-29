const express=require('express')
const {getUser, loginUser, registerUser, logout, routeLogin, routeRegist} = require("../controllers/userControllers")
const {chkTokenExists, verifyToken} = require("../middleware/authMiddleware")
const router = express.Router()

router.post('/login', loginUser)

router.post('/register', registerUser)

router.get('/api/user' , chkTokenExists, verifyToken, getUser)

router.get('/logout', chkTokenExists, verifyToken, logout)

router.get('/login', chkTokenExists, verifyToken, routeLogin)

router.get('/register', chkTokenExists, verifyToken, routeRegist)


module.exports = router;
