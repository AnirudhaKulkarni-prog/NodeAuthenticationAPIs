require('dotenv').config();
const express = require('express');

const getConnection=require('./Database/connection');

console.log();


const app=express();

//middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({extended: false}));




//test if the server is up and running
app.get('/',(req,res)=>{

    res.send("Hello World");
})


// set the server up
app.listen(4000, ()=>{
    getConnection().then(()=>console.log("Server is up and running with the database")).catch(()=>console.log("DB Connection Failed"));

})
