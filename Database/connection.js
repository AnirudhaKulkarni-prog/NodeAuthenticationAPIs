

const mongoose = require("mongoose");


console.log(process.env.MONGO_URL);


async function getConnection(){
    return mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      
    });
  };

  module.exports=getConnection;
