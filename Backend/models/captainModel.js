const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const crypto = require('crypto')


const captainSchema = new mongoose.Schema({
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
        match: [/^\S+@\S+\.\S+$/,'Please enter a valid email'],
        minlength: [5,"email must be 5 character long"]
    },
    password: {
        type: String,
        required: true,
        select: false,// Password field will not be included by default in query results unless explicitely requested.
    },
    socketId: {
        type: String,
    },
    status: {//if the caption is free for ride booking.
        type: String,
        enum: ['active','inactive'],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3,'Color must be atleast 3 char long'],
        },
        plate: { 
            type: String,
            required: true,
            minlength: [3,'Plate number must be atleast 3 char long']
        },
        capacity: {
            type: Number,
            required: true,
            min: [1,'Capacity of vehicle must be alteast 1']
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car','motorcycle','auto']
        }
    },
    location: {
        ltd:{
            type: Number,
        },
        lng:{
            type: Number,
        }
    },
    resetPasswordToken: {
        type: String,
        select: false
    },
    resetPasswordExpires: {
        type: Date,
        select: false
    }
},{
    timestamps: true // This will add createdAt and updatedAt automatically
}) 

captainSchema.index({ location: '2dsphere' });

// Add compound index for better query performance
captainSchema.index({ 
    status: 1, 
    'vehicle.vehicleType': 1, 
    location: '2dsphere' 
});

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign(
        {_id: this._id },
        process.env.JWT_SECRET,
        {expiresIn: '24h'}
    )

    return token;
}

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password,10);
}

captainSchema.methods.comparePassword =async function(password){
    return await bcrypt.compare(password,this.password,)//password -> input from user , this.password ->stored hashed password.
}

// Generate reset token
captainSchema.statics.generateResetToken = function() {
    return crypto.randomBytes(32).toString('hex');
}

const captainModel = mongoose.model('captain',captainSchema);
module.exports = captainModel;