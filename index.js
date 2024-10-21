import express from 'express';
import mongoose from 'mongoose';
import advertRouter from './routes/advert-routes.js';
import userRouter from './routes/user-routes.js';
import cors from 'cors'
// Connect to database
await mongoose.connect(process.env.MONGO_URI);



// create app using express
const app = express();

// use middleware
app.use(express.json());
app.use(cors());



// define routes
app.use(advertRouter);
// listen for incoming requests
app.listen(3005, () =>{
    console.log('App is listening on port 3005');
});