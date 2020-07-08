const { Router } = require('express');
const multer=require('multer')

const bcrypt = require("bcryptjs");
const util = require('util');


const hashPassword = util.promisify(bcrypt.hash);
const compareHashPassword = util.promisify(bcrypt.compare);
const genSalt = util.promisify(bcrypt.genSalt);

// const bycrypt = require('bcrypt');
const UserModel = require('../models/userModel');
// const ordermodel = require('../models/orderModel');
// const omod=require('../models/orderModel')
const orderModel = require("../models/OrderModel");

const tokenHelper=require('../helpers/tokenhelper');
const authenticatonMiddleware = require('../middlewares/authentication');
// const isUserMiddelware = require('../middlewares/isUser')
// const isAdminMiddelware = require('../middlewares/isAdmin')
const userRouter = Router();

var storage=multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './productPictures/');
      },
      
  filename: function (req, file, callback) {
    callback(null, `${req.body.username}.jpg`);
  }
});

var upload = multer({ storage : storage });



userRouter.post('/register',upload.single("picture"), async (req, res, next) => {
    try {
        const data = req.body;
        console.log(req.body,"bodyyyyyyyyy")

        const { pass } = req.body;
        const salt = await genSalt(7)//bycrypt.genSalt(7)
        console.log(salt,pass,"saaaaaaaaalt")
        const hashedPassword = await hashPassword(pass,salt) //bycrypt.hash(pass, salt);

        const user = new UserModel({ ...data, pass: hashedPassword });
        user.picture=`http://localhost:3000/profilePictures/${req.body.username}.jpg`
        const savedUser = await user.save();
        savedUser2=savedUser
        savedUser2.pass=req.body.pass
        const token = await tokenHelper.sign(savedUser2._id);
   
        res.status(200).json({savedUser2,token:token});
    }
    catch (err) {
        console.log("reg error")
        res.status(400).json(err);
    }
});

userRouter.post('/login', async (req, res, next) => {
    try {
        // const data = req.body;
        // console.log(req.body,"bodyyyyyyyyy")
        const { email, password } = req.body;
        console.log("this is login",req.body)
        const currentUser = await UserModel.findOne({ email: email });
        console.log("111111111111",currentUser);
        const passMatch = await compareHashPassword(password,currentUser.pass)//bycrypt.compare(password, currentUser.pass)
        console.log("passMatch");
        if (passMatch) {
            const token = await tokenHelper.sign(currentUser._id);
            // console.log(currentUser._id);
            currentUser2=currentUser
            currentUser2.pass=req.body.pass

            console.log("curr",currentUser2);
            res.json({ token: token, user: currentUser2,userId:currentUser2._id});
        }
        else {
            console.log("log error")
            res.status(400).json({ auth: false });
        }
    }
    catch (err) {
        res.status(400).json(err);
    }
});

userRouter.use(authenticatonMiddleware);

userRouter.post('/profile', async (req, res, next) => {
  console.log(req.user);
            // userModel.findById(userId).populate('orders')
        userInDB= await UserModel.findById(req.user._id).populate("orders")
        res.status(200).json(userInDB)
    
});

userRouter.patch('/update/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body.data;
console.log(id)
        updatedUser = await UserModel.findByIdAndUpdate({_id:req.params.id},  { $set: updates },{new:true})
        res.status(200).json(updatedUser);

    }
    catch (err) {
        console.log("id /")
        res.status(400).json(err)
    }

});
module.exports = userRouter;