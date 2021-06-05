const express=require("express");
const authperson=express.Router();
const UserModel=require("../models/UserModel");
const cors=require("cors");
authperson.get('/',cors(),(req, res)=>{
    console.log("I am a fool")
    res.send("india");
});
authperson.post('/signup/', cors(), (req, res)=>{
    console.log(req);
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
          toAdd.save().then(res.status(200).send(`User created!  <a href='https://webpad-a.herokuapp.com/login'>You can now login</a>`));
      }
  });
}
else{
    if(!req.body.name){
        res.status(400).send("<h1>Name cannot be empty! <a href='https://webpad-a.herokuapp.com/signup'>Go back to signup</a></h1>");
    }
    else if(!req.body.password){
        res.status(400).send("<h1>Password cannot be empty  <a href='https://webpad-a.herokuapp.com/signup'>Go back to signup</a></h1>")
    }
    else if(!req.body.confirm){
        res.status(400).send("Confirm can't be empty  <a href='https://webpad-a.herokuapp.com/signup'>Go back to signup</a>")
    }
    else{
        res.status(400).send(
            "Passwords don't match  <a href='https://webpad-a.herokuapp.com/signup'>Go back to signup</a>"
        )
    }
}
});
authperson.get("/login", cors(), (req, res)=>{
    const {name, password}=req.query;
    console.log(name);
    console.log(password);
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