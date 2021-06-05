const mongoose=require("mongoose");
const ThisSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
const UserModel=mongoose.model('UserModel', ThisSchema, 'Users');
module.exports=UserModel;