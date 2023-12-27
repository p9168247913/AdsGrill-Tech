const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { hashPassword, comparePasswords } = require('../utils/passwordUtils');
const { validateRegister } = require('../middlewares/validationMiddleware');
const bcrypt = require('bcrypt');

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const domainRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && domainRegex.test(email);
}

const register = async (req, res) => {
  try {
    const { name, email, password, dob } = req.body;

    const profilePic = req.files['profilePic'][0].filename;
    const cv = req.files['cv'][0].filename;

    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      return res.status(400).json({ message: 'Invalid email format!!' });
    }

    const existingAdmin = await User.findOne({ $or: [{ email: req.body.email }] })
    if (existingAdmin) {
      return res.status(400).json({ error: "Admin already exists" })
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      dob,
      profilePic,
      cv,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if the password is correct
    const passwordMatch = await comparePasswords(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate and return a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.key, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { register, login };
