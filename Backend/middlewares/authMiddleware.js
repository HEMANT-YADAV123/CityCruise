const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const blacklistTokenModel = require('../models/blacklistTokenModel');
const captainModel = require('../models/captainModel');

dotenv.config();

module.exports.authUser = async (req,res,next) => {//we are checking if the user is login or not
    //token is present in two places 1.>cookie  2.>header authorization(we have to split the header.authorization to get header)
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token)
    {
        return res.status(401).json({ message: "Unauthorized user" });
    }

    const isBlackListed = await blacklistTokenModel.findOne({token: token});

    if(isBlackListed)
    {
        return res.status(401).json({message: 'Unauthorized'});
    }

    //if token is found then we have to decode it.
    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //it gives us the token which only have _id because we created that token with _id only.
        const user = await userModel.findById(decoded._id);//we find the user using that id

        if(!user)
        {
            return res.status(401).json({message: 'User not found'});
        }

        //set this user in request.user as we are accessing the user (get request)
        req.user = user;

        return next(); 

    } catch (error) {
        return res.status(401).json({message: "Unauthorized user"})
    }
}

module.exports.authCaptain = async (req,res,next) => {//we are checking if the user is login or not
    //token is present in two places 1.>cookie  2.>header authorization(we have to split the header.authorization to get header)
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token)
    {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const isBlackListed = await blacklistTokenModel.findOne({token: token});

    if(isBlackListed)
    {
        return res.status(401).json({message: 'Unauthorized'});
    }

    //if token is found then we have to decode it.
    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //it gives us the token which only have _id because we created that token with _id only.
        const captain = await captainModel.findById(decoded._id);//we find the user using that id

        if(!captain)
        {
            return res.status(401).json({message: 'Captain not found'});
        }

        //set this user in request.user as we are accessing the user (get request)
        req.captain = captain;

        return next(); 

    } catch (error) {
        return res.status(401).json({message: "Unauthorized"})
    }
}