const express = require('express');

const getConnection=require('./Database/connection');


const app=express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/',(req,res)=>{

    res.send("Hello World");
})

app.listen(4000, ()=>{
    getConnection.then(()=>console.log("Server is up and running with the database")).catch(()=>console.log("DB Connection Failed"));
    
})
