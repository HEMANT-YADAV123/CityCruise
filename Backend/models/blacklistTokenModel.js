const mongoose = require('mongoose');
const userModel = require('./userModel');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400//24 hrs in sec, it will delete this document after 24 hrs
    }

});

module.exports = mongoose.model('BlacklistToken',blacklistTokenSchema)