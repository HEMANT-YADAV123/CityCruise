const mongoose = require('mongoose');

const connectToDb =  async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database is connected to ${mongoose.connection.host}`);
        
    } catch (error) {
        console.log(`MongoDb DataBase Error ${error}`);
    }
}

module.exports = connectToDb;