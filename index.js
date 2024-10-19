import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// create app using express
const app = express();

// use middleware
app.use(express.json())
app.use(cors())


// define routes

// listen for incoming requests
app.listen(3005, () =>{
    console.log('App is listening on port 3005');
});