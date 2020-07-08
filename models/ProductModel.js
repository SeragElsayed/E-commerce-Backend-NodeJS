const mongoose=require("mongoose")
 const Product={ 
   
      title: {
        type: String,
        unique:true,
        required:true,
        default:"N/A",
      },
      picture: {
       type: String,
       required:true,
       default:"N/A",
      
      },
      details: {
        type: String,
        required:true,
        default:"N/A",
      },
      price: {
        type: Number,
        required:true,
        default:0,
      }
 };

const ProductSchema = new mongoose.Schema(Product);
const ProductModel = mongoose.model('Product', ProductSchema);

module.exports=ProductModel;