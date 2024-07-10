const jwt = require("jsonwebtoken")
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

exports.chkTokenExists = (req, res, next)=>{
    try{
        const cookie = req.headers.cookie
        if(cookie){
            next();
        }
        else{
            return res.json({})
        }
    }
    catch(err){
        res.status(500).json({})
    }
}

exports.verifyToken = (req, res, next) =>{
    try{
        const cookies = req.headers.cookie;
        const token= cookies.split("=")[1]
        if (!token){
            return res.status(404).json({})
        }
        else{
            jwt.verify(String(token), JWT_SECRET_KEY, (err, user)=>{
                if (err){
                    return res.status(401).json({})
                }
                else{
                    req.id = user.id
                    next();
                }
            })
        }
    }
    catch(err){
        res.status(404).json({})
    }
}
