const express=require("express")
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const cors=require("cors");
require("dotenv").config();
const url=process.env.DB_URI;
mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology:true}).then(
    ()=>{ console.log("Connection Established")}
 ).catch(err=>{console.error(err)} );
const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(express.static("public"));
app.use("/auth", require("./routes/auth"));
app.use("/blogs", require("./routes/main"));
app.listen(process.env.PORT || 3002, console.log(`Listening on port ${process.env.PORT || 3002}`));