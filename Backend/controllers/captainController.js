const captainModel = require('../models/captainModel');
const captainService = require('../services/captainServices');
const {validationResult} = require('express-validator')
const blacklistTokenModel = require('../models/blacklistTokenModel');
const { sendPasswordResetEmail } = require('./emailController');

module.exports.registerController = async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array() });
    }

    const {fullname,email,password,vehicle} = req.body;
    const isCaptainAlreadyExists = await captainModel.findOne({email});
    if(isCaptainAlreadyExists)
    {
        return res.status(400).json({message: 'Captain Already exist'});
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
    })

    const token = captain.generateAuthToken();
    res.status(201).json({token,captain});
}

module.exports.loginController = async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array() });
    }

    const {email,password} = req.body;

    const captain = await captainModel.findOne({email}).select('+password');

    if(!captain)
    {
        return res.status(401).json({message: 'Invalid email or password'});
    }
    const isMatch = await captain.comparePassword(password);
    if(!isMatch)
    {
        return res.status(401).json({message: "Invalid email or password"});
    }

    const token = captain.generateAuthToken();

    res.cookie('token',token);

    res.status(200).json({token,captain});
}

// Forgot Password Controller
module.exports.forgotPasswordController = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }

        const { email } = req.body;

        // Check if captain exists
        const captain = await captainModel.findOne({ email });
        if (!captain) {
            return res.status(404).json({ message: 'No captain found with this email address' });
        }

        // Generate reset token
        const resetToken = captainModel.generateResetToken();
        const resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes in milliseconds

        // Save reset token to database
        captain.resetPasswordToken = resetToken;
        captain.resetPasswordExpires = resetTokenExpiry;
        await captain.save();

        // Send reset email
        await sendPasswordResetEmail(email, resetToken);

        res.status(200).json({ 
            message: 'Password reset email sent successfully',
            success: true 
        });

    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: 'Failed to send reset email. Please try again.' });
    }
};

// Verify Reset Token Controller
module.exports.verifyResetTokenController = async (req, res, next) => {
    try {
        const { token } = req.params;

        if (!token) {
            return res.status(400).json({ message: 'Reset token is required' });
        }

        // Find captain with valid reset token
        const captain = await captainModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!captain) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        res.status(200).json({ message: 'Token is valid', success: true });

    } catch (error) {
        console.error('Verify token error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Reset Password Controller
module.exports.resetPasswordController = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }

        const { token, password } = req.body;

        if (!token) {
            return res.status(400).json({ message: 'Reset token is required' });
        }

        // Find captain with valid reset token
        const captain = await captainModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!captain) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        // Hash new password
        const hashedPassword = await captainModel.hashPassword(password);

        // Update captain's password and clear reset token
        captain.password = hashedPassword;
        captain.resetPasswordToken = undefined;
        captain.resetPasswordExpires = undefined;
        await captain.save();

        res.status(200).json({ 
            message: 'Password has been reset successfully',
            success: true 
        });

    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Failed to reset password. Please try again.' });
    }
};

module.exports.getCaptainProfile = async (req,res,next) => {
    res.status(200).json({ captain: req.captain });
}

module.exports.logoutController = async (req,res,next) => {
    
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization?.split(' ')[1]);
    await blacklistTokenModel.create({token});

    res.clearCookie('token');

    res.status(200).json({ message:'Logged out Successfully' });
}