const {verify} =require('../helpers/tokenHelper');
const userModel=require('../models/userModel');

const  haveToken = async function(req,res,next){
    try{
    const token = req.body.token;
    const payload = await verify(token)
    const user = await userModel.findById(payload.id).populate('orders')
    req.user=user;
    next()
    }catch(err){
        res.status(400).send("Auth. Failed...")
    }
}
module.exports=haveToken