import express from 'express';
import mongoose from 'mongoose';
import advertRouter from './routes/advert-routes.js';
import userRouter from './routes/user-routes.js';
import cors from 'cors';

// Connect to database
await mongoose.connect(process.env.MONGO_URI);

// create app using express
const app = express();

// use middlewares
app.use(cors());
app.use(express.json());




// Use routes
app.use(advertRouter);
app.use(userRouter);

// listen for incoming requests
app.listen(3005, () =>{
    console.log('App is listening on port 3005');
});