const model = require("../Schemas/Register")
const jwt = require("jsonwebtoken")
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const getUser = async (req,res,next)=>{
    try{
        const userId= req.id;
        const user = await model.findById(userId, {password:0,tokens:0})
        if(!user){
            return res.status(404).json("User Doesnot Exists" )
        }
        return res.status(200).json(user)

    }
    catch(err){
        return res.status(500).json('Internal server error ')
    }
   

} 

const loginUser = async (req, res) =>{
    const {email, password} = req.body;
    const chkExists = await model.findOne({ email })
    try{
        if (chkExists){
            
            const JWT_TOKEN = jwt.sign({id: chkExists._id, }, JWT_SECRET_KEY, {
                expiresIn:"10min"
            })
            await model.findByIdAndUpdate(chkExists._id, {tokens:[{token:JWT_TOKEN, signedAt:Date.now().toString()}]})

            const oldTokens = chkExists.tokens

            if (oldTokens){
                oldTokens.filter( t => {
                    const diff = Date.now() - parseInt(t.signedAt) / 1000
                    if(diff  < 600){
                        return t
                    }
                }
                )
            }

            if(password === chkExists.password){
                res.cookie('myCookie',JWT_TOKEN,{
                    maxaAge: 600,
                    path:'/'
                })
                res.status(200).json({
                message:"Logged In",
            })
            
            }
            else{
            res.status(401).json('Incorrect password')
            }
        }
        else if (!chkExists){
            res.status(404).json('User doesnot exists.')
        }   
    }
    catch(err){
        res.status(500).json("internal server error")
    }
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const data = new model({
            name,
            email,
            password
        });
        const alreadyExists = await model.findOne({ email });

        if (alreadyExists){
            res.status(409).json('User already exists')
        }
        else{
            await data.validate()
            await data.save()
            res.status(200).json('OK')
        }
        
    } catch (error) {
        if (err.name === 'ValidationError') {
            return res.status(400).json('Please Enter Correct Data');
        }
        res.status(500).json('Internal server error.');
    }
}

const logout = async (req, res) =>{
    try{
        const userID = req.id
        await model.findByIdAndUpdate(userID, {tokens:[]})
        res.clearCookie('myCookie',{path:'/'})
        return res.status(200).json("OK")
    }
    catch(err){
        res.status(500).json("internal server error")
    }

}
const routeLogin = async (req, res) =>{
    try{
        res.status(200).json('not logged in')
    }
    catch(err){
        res.status(500).json("internal server error")
    }
}
const routeRegist = async (req, res) =>{
    try{
        res.status(200).json('not logged in')
    }
    catch(err){
        res.status(500).json("internal server error")
    }
}
module.exports = {
    getUser,
    loginUser,
    registerUser,
    logout,
    routeLogin,
    routeRegist,
};