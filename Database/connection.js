

const mongoose = require("mongoose");





async function getConnection(){
    return mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      
    });
  };

  module.exports=getConnection;
