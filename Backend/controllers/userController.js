const { json } = require('express');
const userModel = require('../models/userModel');
const userService = require('../services/userServices')
const {validationResult} = require('express-validator')

module.exports.registerController = async(req,res,next)=>{
    const errors = validationResult(req); //agr kuch bi error hai request(jo hamne routes me dali hai) me then set it to error variable.
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array() });
    }
    
    const { fullname,email,password } = req.body;
    const hashedPassword = await userModel.hashPassword(password);//hash the password.
    
    //if everything is right then create user 
    const user = await userService.createUser({ 
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword 
    });

    //after creating the user generate the token.
    const token = user.generateAuthToken();

    //send the token and the created user with 201 status code.
    res.status(201).json({
        token,user});
}


module.exports.loginController = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array() });
    }

    const { email,password } = req.body;
    //check if the user exist with this email.
    const user = await userModel.findOne({email}).select('+password')//we are explicitly requesting passwors as select password was false in userModel. 
    if(!user)
    {
        return res.status(401).json({message: "Invalid email or password"});
    }
    //if user exist then check password.
    const isMatch = await user.comparePassword(password);
    if(!isMatch)
    {
        return res.status(401).json({message: "Invalid email or password"});
    }

    //if everything is right then we will generate token.
    const token = user.generateAuthToken();

    return res.status(200).json({token,user});
}

module.exports.getUserProfile = async(req,res,next)=>{
    res.status(200).json(req.user)
}