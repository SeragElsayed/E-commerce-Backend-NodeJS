const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);



const url=" mongodb+srv://serag:serag123@serag-jmhxv.mongodb.net/shop?retryWrites=true&w=majority";

mongoose.connect(url,{useUnifiedTopology:true,useNewUrlParser:true})
.then(()=>{
    console.log('connected');

})
.catch("error")