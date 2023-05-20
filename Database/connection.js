

const mongoose = require("mongoose");



function getConnection(){
    return mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      
    });
  };

  module.exports=getConnection;
  