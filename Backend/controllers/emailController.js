const nodemailer = require('nodemailer')
const dotenv = require('dotenv');

dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can change this to your email service
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS  // Your email password or app password
    }
});

// Send password reset email
const sendPasswordResetEmail = async (email, resetToken) => {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request - CityCruise',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
                    <h1 style="color: #333;">CityCruise</h1>
                </div>
                
                <div style="padding: 30px;">
                    <h2 style="color: #333;">Password Reset Request</h2>
                    
                    <p style="color: #666; line-height: 1.6;">
                        We received a request to reset your password. Click the button below to reset it:
                    </p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetUrl}" 
                           style="background-color: #000; color: white; padding: 12px 30px; 
                                  text-decoration: none; border-radius: 5px; display: inline-block;">
                            Reset Password
                        </a>
                    </div>
                    
                    <p style="color: #666; font-size: 14px;">
                        If you didn't request this password reset, please ignore this email. 
                        This link will expire in 10 minutes.
                    </p>
                    
                    <p style="color: #666; font-size: 14px;">
                        If the button doesn't work, copy and paste this link into your browser:
                        <br>
                        <a href="${resetUrl}" style="color: #007bff;">${resetUrl}</a>
                    </p>
                </div>
                
                <div style="background-color: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px;">
                    <p>© 2024 CityCruise. All rights reserved.</p>
                </div>
            </div>
        `
    };
    
    await transporter.sendMail(mailOptions);
};

// Send password reset email for captains
const sendCaptainPasswordResetEmail = async (email, resetToken) => {
    const resetUrl = `${process.env.FRONTEND_URL}/captain-reset-password/${resetToken}`;
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request - CityCruise Captain',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
                    <h1 style="color: #333;">CityCruise Captain</h1>
                </div>
                
                <div style="padding: 30px;">
                    <h2 style="color: #333;">Password Reset Request</h2>
                    
                    <p style="color: #666; line-height: 1.6;">
                        We received a request to reset your password for your CityCruise Captain account. 
                        Click the button below to reset it:
                    </p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetUrl}" 
                           style="background-color: #000; color: white; padding: 12px 30px; 
                                  text-decoration: none; border-radius: 5px; display: inline-block;">
                            Reset Captain Password
                        </a>
                    </div>
                    
                    <p style="color: #666; font-size: 14px;">
                        If you didn't request this password reset, please ignore this email. 
                        This link will expire in 1 hour for security reasons.
                    </p>
                    
                    <p style="color: #666; font-size: 14px;">
                        If the button doesn't work, copy and paste this link into your browser:
                        <br>
                        <a href="${resetUrl}" style="color: #007bff;">${resetUrl}</a>
                    </p>
                </div>
                
                <div style="background-color: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px;">
                    <p>© 2024 CityCruise. All rights reserved.</p>
                </div>
            </div>
        `
    };
    
    await transporter.sendMail(mailOptions);
};

module.exports = {
    sendPasswordResetEmail,
    sendCaptainPasswordResetEmail
};