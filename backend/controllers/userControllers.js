const asyncHandler = require('express-async-handler')
const User = require('../modals/userModel.js')
const dotenv = require('dotenv').config()
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Find the user by email
    const user = await User.findOne({ email });
    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: 'No Record found' });
    }
    // Validate the password using bcrypt
    const isValidPassword = await bcrypt.compare(password, user.password);
    // Check if the password is valid
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

const payload = {
  userId: user._id,
};

const secretKey = process.env.SECRET;

const token = jwt.sign(payload, secretKey);

    // Password is valid, user is authenticated
    res.status(200).json({ message: 'Login successful', user, token });
    return next();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports.registerUser = async (req, res) => {
  const {v_id, name, email, password} = req.body;

  const user = await User.create({
    v_id, name, email, password
  });

  if(user){
    res.status(201).json({
      user
    })
  }
    else{
      res.status(400).send("Something went wrong");
    }
  };

module.exports.updateUser = async (req, res) => {
  try {
    const userid = req.params.id;
    const updatedFields = req.body; // Assuming you're sending the updated goal data in the request body

    // Find the goal by ID and update it
    const updatedUser = await User.findByIdAndUpdate(userid, updatedFields, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating User:', error);
    return res.status(500).json({ message: 'An error occurred while updating the User' });
  }
};


module.exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID and delete it
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting User:', error);
    return res.status(500).json({ message: 'An error occurred while deleting the User' });
  }
};


module.exports.getUser = async (req,res,next)=>{

  try {
    const { email, password } = req.body;
    // Find the user by email

    const user = await User.findOne(req.user._id);
    // Check if the user exists
    // if (req.user._id !== user._id) {
    //   return res.status(401).json({ error: 'No Record found' });
    // }
    // Validate the password using bcrypt
    const isValidPassword = await bcrypt.compare(password, user.password);
    // Check if the password is valid
    // if (!isValidPassword) {
    //   return res.status(401).json({ error: 'Invalid email or password' });
    // }

    // Password is valid, user is authenticated
    if(user._id == req.user._id){
    res.status(200).json({   user });
    }
    else{
      res.status(400).json({ Response: 'User Not Found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal API error' });
  }

}


