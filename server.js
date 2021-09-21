//import express
var express=require('express')

//initialisation du serveur
var app=express()

//require and configuration of dotenv
require('dotenv').config()

//call db
const connectDB=require('./config/dbConnect')

//connect to db
connectDB();


//routes
app.use(express.json());
app.use("/user",require("./routes/user"))
//server
var PORT=5000;
app.listen(process.env.PORT,(err)=>err?console.log(err):console.log(`server is running on ${PORT}`));
