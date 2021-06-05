const mongoose=require("mongoose");
const BlogSchema=new mongoose.Schema({
    posted_by:{
        type:String,
        required:true
    },
    posted_at:{
        type:Date,
        default:new Date()
    },
    last_updated_at:{
        type:Date,
        default:new Date()
    },
    blog_title:{
        type:String,
        required:true
    },
    blog_text:{
        type:String,
        required:true
    }
});
const Blog=mongoose.model("Blog", BlogSchema, "Blogs")
module.exports=Blog;