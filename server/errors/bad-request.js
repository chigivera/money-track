const Joi = require('joi');

const validateInputs = (req, res, next) => {
    console.log("validation")
  const schema = {
    login: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required()
    }),
    register: Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required()
    })
  };
  const type = req.originalUrl === '/register' ? 'register' : 'login';

  const { error } = schema[type].validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

module.exports = validateInputs;
