
const userModel=require('../models/userModel');

const isAdmin = async function(req,res,next){
    try{
        if(!req.user.isAdmin){
            throw("Auth. Failed ...")
        }
        next()
    }catch(err){
        res.status(400).send(err)
    }

}
module.exports=isAdmin