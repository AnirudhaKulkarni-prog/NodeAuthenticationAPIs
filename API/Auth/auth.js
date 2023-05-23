const express=require('express');

const bcrypt=require('bcryptjs');


const jwt=require('jsonwebtoken');

const { ValidateSignin,ValidateSignup } =require('../../Validation/auth.js')

const Router=express.Router();


const UserModel=require('../../Database/User');

/*
Route         /signup
Descrip       Signup with first name ,last name, email and password
Params        None
Access        Public
Method        POST
*/

Router.post("/signup", async(req,res) => {
    try {

      
    
        await ValidateSignup(req.body);

    
  
    await UserModel.findByEmail(req.body);
     
    //DB
     const newUser = await UserModel.create(req.body);

    
     //JWT Auth Token
     const token = newUser.generateJwtToken();
  
     return res.status(200).json({token});
  
    } catch (error) {
      return res.status(500).json({error: error.message});
    }
  });
  
  
  /*
  Route         /signin
  Descrip       Signin with email and password
  Params        None
  Access        Public
  Method        POST
  */
  
  Router.post("/signin", async(req,res) => {
    try {
     await ValidateSignin(req.body);
  
      const user = await UserModel.findByEmailAndPassword(
        req.body
      );
  
     //JWT Auth Token
     const token = user.generateJwtToken();
  
     return res.status(200).json({token, status: "Success"});
  
    } catch (error) {
      return res.status(500).json({error: error.message});
    }
  });
  
module.exports=Router;
