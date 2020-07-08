const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const order={
    
    date:{
        type:Date,
        required:true,
        default:Date.now
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0,
    },
    productsTitles:[{
        type:String,
        required:true,
        default:"N/A",
    }],
    userId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        index:true
    },
    status:{
        type:String,
        enum:["Pending","Accepted","Rejected"],
        default:"Pending"

    }

}

const orderSchema = new mongoose.Schema(order);

orderSchema.plugin(uniqueValidator, { type: 'userName-unique-validator' });

orderModel = new mongoose.model('Order',orderSchema);

module.exports = orderModel;

