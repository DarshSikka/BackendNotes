const express=require("express")
const blogger=express.Router();
const cors=require("cors")
const Blog=require("../models/Blog");
blogger.get('/', (req, res)=>{
   Blog.find({}).sort([["last_updated_at", -1]]).then(result=>{
       res.send(result);
   })
});
blogger.post("/create", (req, res)=>{
    const created=new Blog({
        posted_by:req.body.login,
        blog_title:req.body.title,
        blog_text:req.body.content,
    }
    );
    created.save();
    res.send("created")
});
module.exports=blogger