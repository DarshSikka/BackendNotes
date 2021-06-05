const express=require("express")
const blogger=express.Router();
const cors=require("cors")
const Blog=require("../models/Blog");
blogger.get('/', cors(),(req, res)=>{
   Blog.find({}).sort([["last_updated_at", -1]]).then(result=>{
       res.send(result);
   })
});
blogger.post("/create", cors(),(req, res)=>{
    console.log(req.body);
    Blog.findOne({posted_by:req.body.login, blog_title:req.body.title}).then(result=>{
    if(!result){
        const created=new Blog({
            posted_by:req.body.login,
            blog_title:req.body.title,
            blog_text:req.body.content,
        });
    created.save();
    res.redirect("https://webpad-a.herokuapp.com/")
        }
        else{
            console.log(result);
            res.send("You Have already made a blog with that title <a href='https://webpad-a.herokuapp.com/'>Home</a>")
        }
    }
    )
});
blogger.get("/user/:userid",cors(),(req, res)=>{
    Blog.find({posted_by:req.params.userid}).then(result=>res.send(result));
});
blogger.post("/edit/:user/:nam", (req, res)=>{
    Blog.findOneAndUpdate({posted_by:req.params.user, blog_title:req.params.nam}, {last_updated_at:new Date(), blog_text:req.body.txt, blog_title:req.body.title}).then(result=>{
        res.redirect("https://webpad-a.herokuapp.com/me");
    });
});
module.exports=blogger