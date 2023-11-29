const { body, validationResult } = require('express-validator');
const Joi = require('joi');

const registerValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  dob: Joi.string().required(),
});

const validateRegister = (req, res, next) => {
  const result = registerValidation.validate(req.body);

  if (result.error) {
    return res.status(400).json({ error: result.error.details[0].message });
  }

  next();
};

module.exports = { validateRegister };
