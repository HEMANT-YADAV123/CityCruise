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
app.use(cors({
    origin: true, // reflect the request origin(in devp we can use true but for production we should only specify our frontend origins)
    credentials: true}));//accept the credentials(usually cookie) from these origins
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