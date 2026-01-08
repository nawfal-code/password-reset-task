import express from 'express';
import cors from 'cors';
import router from './routers/userRouters.js';
import dotenv from 'dotenv';
import connectDB from './database/dbConfig.js';

dotenv.config();


const port =process.env.PORT || 5000;

const app=express();


//default middleware
app.use(express.json());

//third party middleware
app.use(cors());

connectDB();

//default router
app.get("/",(req,res)=>{
  res.send("welcome to the Task!");
});


//routers
app.use("/api/users/",router);

app.listen(port,()=>{
    console.log(`server starts at ${port}`)
});