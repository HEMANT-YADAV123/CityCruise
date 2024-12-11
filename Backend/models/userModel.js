const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            require:[true,'First name is required'],
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
        require: true,
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
})
//generating token
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign(
        {_id: this._id},
        process.env.JWT_SECRET
    );
    return token;
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password,10);
}

userSchema.methods.comparePassword =async function(password){
    return await bcrypt.compare(password,this.password,)//password -> input from user , this.password ->stored hashed password.
}

const userModel = mongoose.model('user',userSchema);
module.exports = userModel;