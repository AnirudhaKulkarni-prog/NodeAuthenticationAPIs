const joi = require('joi');

const ValidateSignup = async (userData) => {

const Schema = joi.object({
  first_name: joi.string().required(),
  last_name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
 
});

return Schema.validateAsync(userData);

};

const ValidateSignin = async (userData) => {

const Schema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
});

return Schema.validateAsync(userData);

};



module.exports = {
    ValidateSignin,
    ValidateSignup
  };