const express=require("express");
const authperson=express.Router();
const UserModel=require("../models/UserModel");
const cors=require("cors");
authperson.get('/',cors(),(req, res)=>{
    console.log("I am a fool")
    res.send("india");
});
authperson.post('/signup/', cors(), (req, res)=>{
  if(req.body.name && req.body.password && req.body.confirm && req.body.confirm===req.body.password){
  UserModel.findOne({username:req.body.name}).then(result=>{
      if(result){
          res.status(401).send("Username is taken");
      }
      else{ 
          const toAdd=new UserModel({
              username:req.body.name,
              password:req.body.password
          });
          console.log(toAdd);
          toAdd.save().then(res.status(200).send(`User created!`));
      }
  });
}
else{
    if(!req.body.name){
        res.status(400).send("Name cannot be empty");
    }
    else if(!req.body.password){
        res.status(400).send("Password cannot be empty")
    }
    else if(!req.body.confirm){
        res.status(400).send("Confirm can't be empty")
    }
    else{
        res.status(400).send(
            "Passwords don't match"
        )
    }
}
});
authperson.post("/login", cors(), (req, res)=>{
    const {name, password}=req.body;
    UserModel.findOne({username:name, password}).then(result=>{
        if(result){
            res.status(200).send("Authenticated");
        }
        else{
            res.status(401).send("Unauthorized");
        }
    });
});

module.exports=authperson;