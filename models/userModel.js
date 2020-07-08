const mongoose=require('mongoose'),
Schema=mongoose.Schema,
relationship=require("mongoose-relationship");
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({

  Orders:[
      {
        type:Schema.ObjectId,ref:"Child"
      }
    ],

  email: {
    type: String,
    minlength: 1,
    trim: true,
    required: true,
    unique:true
  },
  pass:{
    type:String,
    required:true
  }
    ,
    picture: {
      type:String,
      dafault:""
    },
    username: {
      type:String,
      unique:true,
      required:true,
    
    },
  gender: {
    type:String,
    default:'N/A',
    enum:['F','m','N/A']
  },
  isAdmin:{
    type:Boolean,
    required:true,
    default:false
}
  
});
userSchema.plugin(uniqueValidator);
const User=mongoose.model('User',userSchema);
var ChildSchema=new Schema({user:{type:Schema.ObjectId,ref:"User",childPath:"orders"}
});
ChildSchema.plugin(relationship,{relationshipPathName:'user'});
var Child=mongoose.model("Child",ChildSchema)
var user=new User({});
// user.save();
var child=new Child({user:user._id});
// child.save();
// child.remove();
module.exports=User;