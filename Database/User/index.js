const mongoose = require('mongoose');

const bcrypt=require("bcryptjs");

const jwt=require("jsonwebtoken");

//defined a userschema
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
 
},
{
    timestamps: true
}

);

// creates a JWT token for every user instance using the  secret and MongoDB Id

UserSchema.methods.generateJwtToken = function() {
    return jwt.sign({user: this._id.toString()}, "AuthApp");
};

//Checking/Authenticating if we have the Email and Password(helps during sign in post request)

UserSchema.statics.findByEmailAndPassword = async ({ email, password }) => {
    //check whether the email exists
    const user = await UserModel.findOne({email});
  if(!user) throw new Error("User doesnot exist");
  
    //compare password
    const doesPasswordMatch = await bcrypt.compare(password, user.password);
  
    if(!doesPasswordMatch) {
      throw new Error("Invalid password");
    }
    return user;
};


//hashing the password and saving the user(it helps during sign up post request)
UserSchema.pre("save",function(next){
    const user = this;
  
  //password is not modified
    if(!user.isModified("password")) return next();
  
  //generating bcrypt salt
    bcrypt.genSalt(8,(error,salt)=> {
      if(error) return next(error);
  
      //hashing the password
      bcrypt.hash(user.password, salt, (error,hash)=>{
        if(error) return next(error);
  
        //assigning hashed password
        user.password = hash;
        return next();
      });
    });
  });

const User = mongoose.model('User', UserSchema);

module.exports = User;

  