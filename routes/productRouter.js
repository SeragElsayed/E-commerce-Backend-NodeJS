const{Router}=require("express")
const ProductRouter=Router();
const ProductModel=require("../models/ProductModel")
var multer  = require('multer')

const authMiddelware=require('../middlewares/authentication')
const isAdmin=require('../middlewares/isAdmin')

const storage=multer.diskStorage({
    destination:function(req,file,cb){
    cb(null,'./productpictures/')// the place to save in 
    
    },//define where the file should be stored
    filename:function (req,file,cb)  {
        console.log(req.body.title,"cbbbbbbbbbbb")
      cb( null, `${req.body.title}.jpg`);
       }
    })
    
    const upload=multer({storage:storage}) 

    // ProductRouter.post('/productimage', upload.single('picture'), function (req, res, next) {
    //   console.log(req.filename)
    //   res.status(200).send("uploded")  })
  
// ProductRouter.use(authMiddelware);

ProductRouter.get("/",async(req,res)=>{
    try{
         
        const Products=await ProductModel.find();
        res.status(200).json(Products)
    }catch(err){
        res.status(401).json(err)
    }
})

// ProductRouter.use(isAdmin);


ProductRouter.post("/Create",upload.single('picture')
      ,async(req,res,next)=>{
        try{
            const data=req.body;
            data.picture=`http://localhost:3001/productpictures/${req.body.title}.jpg`
             
            const product=new ProductModel(data);
             
    
            const productInDb=await product.save();
           
             req.body.productInfo=productInDb
            res.status(200).send("uploded")
        }catch(err){
            res.status(401).json(err)
    
        }
    
    })
   

ProductRouter.delete("/Delete/:id",async(req,res)=>{
    try{
        // console.log(req)
        console.log('post op')
          const params=req.params
          const prodid=params.id;
          const deletedProduct=await ProductModel.findByIdAndDelete({_id:prodid});

          res.status(200).json(deletedProduct);
    }
    catch(err){
        console.log(err)
        res.status(401).json(err)
     }
})
ProductRouter.patch("/Patch/:id/:title",async(req,res)=>{
    try{
        const{id,title}=req.params;
        const updatedProduct=await ProductModel.findByIdAndUpdate(id,req.body)
         res.status(200).json(updatedProduct)
    }catch(err){
        res.status(401).json(err)

    }
})
module.exports=ProductRouter;