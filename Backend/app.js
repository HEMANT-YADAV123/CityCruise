const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/userRoutes')
const captainRoutes = require('./routes/captainRoutes');
const mapsRoutes = require('./routes/mapsRoutes');
const rideRoutes = require('./routes/rideRoutes');

connectToDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send('Hello World')
});
app.use('/users',userRoutes);
app.use('/captains',captainRoutes,);
app.use('/maps',mapsRoutes);
app.use('/rides',rideRoutes);
module.exports = app;