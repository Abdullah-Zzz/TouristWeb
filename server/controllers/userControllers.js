const model = require("../Schemas/Register")
const jwt = require("jsonwebtoken")
const JWT_SECRET_KEY = "SuperSecretkey"

const getUser = async (req,res,next)=>{
    try{
        const userId= req.id;
        const user = await model.findById(userId, "-password")
        if(!user){
            return res.status(404).json({})
        }
        return res.status(200).json({user})

    }
    catch(err){
        return res.status(500).json({})
    }
   

} 

const loginUser = async (req, res) =>{
    const {email, password} = req.body;
    const chkExists = await model.findOne({ email })
    try{
        if (chkExists){
            
            const JWT_TOKEN = jwt.sign({id: chkExists._id, }, JWT_SECRET_KEY, {
                expiresIn:"50min"
            })
            
            if(password === chkExists.password){
                res.status(200).json({
                message:"Logged In",
                token:JWT_TOKEN,
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
            res.status(200).json('ok')
        }
        
    } catch (error) {
        if (err.name === 'ValidationError') {
            return res.status(400).json('Please Enter Correct Data');
        }
        res.status(500).json('Internal server error.');
    }
}

module.exports = {
    getUser,
    loginUser,
    registerUser
};