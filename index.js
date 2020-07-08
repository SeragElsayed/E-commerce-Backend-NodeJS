const express = require('express');
const cors = require('cors');

require("./dbConnect")

const app = express();

const port = 3001;
// userModel = require("./models/userModel")

const userRouter = require('./routes/userRouter')
const productRouter=require("./routes/productRouter")
const orderRouter=require("./routes/orderRouter")
const multer = require('multer')
const upload = multer({ dest: './uploads/' })

const isUserMiddelware=require("./middlewares/isUser")

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/productpictures",express.static("productpictures"))

app.use("/users",userRouter)
app.use("/orders",orderRouter)


app.use("/products",productRouter)



app.listen(port,()=>{
    console.log(`Example app listening on port ${port}!`)
})