const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required:[true,'First name is required'],
            minlength: [3,'First name should be alteast 3 character long'],
        } ,
        lastname:{
            type: String,
            minlength: [3,'Last name should be alteast 3 character long'],
        } ,
    },
    email: {
        type: String,
        unique: [true,'email is already registered'],
        required: true,
        lowercase: true,
        minlength: [5,"email must be 5 character long"]
    },
    password: {
        type: String,
        required: true,
        select: false,// Password field will not be included by default in query results unless explicitely requested.
    },
    socketId: {//this socket id will be used for live tracking.
        type: String,
    },
    // Password reset fields
    resetPasswordToken: {
        type: String,
        select: false
    },
    resetPasswordExpires: {
        type: Date,
        select: false
    }
}, {
    timestamps: true // This will add createdAt and updatedAt automatically
});
//generating token
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign(
        {_id: this._id},
        process.env.JWT_SECRET,
        {expiresIn: '24h'}//added expire time.
    );
    return token;
}

// Generate password reset token
userSchema.methods.generatePasswordResetToken = function() {
    // Generate random token
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    
    // Set expire time (10 minutes)
    this.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
    
    return resetToken;
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password,10);
}

userSchema.methods.comparePassword =async function(password){
    return await bcrypt.compare(password,this.password,)//password -> input from user , this.password ->stored hashed password.
}

const userModel = mongoose.model('user',userSchema);
module.exports = userModel;