const UserModel = require('../models/userModel');
const tokenHelper=require('../helpers/tokenhelper');
module.exports=async (req,res,next)=>{
    try{
       
      
        const token=req.body;
        console.log(token,req.body,"this is the token")
        const payload = await tokenHelper.verify(token.token);
        console.log(payload,"this ispayload")
        const userId = payload.userId;
        req.user = await UserModel.findById((userId)).populate('orders');
        console.log(req.user)
        next();
    }catch(err){
      console.log(err)
        res.status(401).json({message:'authentication failed'});
    }
}