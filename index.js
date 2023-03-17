import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import profileRoutes from './routes/data.js';





const app= express();



app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', profileRoutes);


const CONNECTION_URL = 'mongodb+srv://Mrinal561:Mrinal701@memeverse.xcoc4vb.mongodb.net/?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000;



mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> app.listen(PORT, console.log(`server running on ${PORT}`)))
.catch((err)=> console.log(err.message));