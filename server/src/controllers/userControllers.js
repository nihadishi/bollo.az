const User = require('../models/userSchema')


const test = (req,res)=>{
    res.json('test is running working')
}
const registerUser = async (req,res)=>{
    try {
        const {fullname,region,number,email,password} = req.body;
        if(!(fullname && region && number && email && password)){
            return res.json({
                error: 'Invalid Input'
            })
        }
        //password validation yazacam

        const exist = await User.findOne({email});
        if (exist) {
            return res.json({
                error: 'Email is taken already'
            })
            
        }

        const user = await User.create({
            fullname, region, number, email, password
        })
        return res.json(user)
    } catch (error) {
        console.log(error);
    }

}
module.exports = {
    test,
    registerUser
}