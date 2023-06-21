const asyncHandler = require('express-async-handler')
const User = require('../modals/userModel.js')
const bcrypt = require('bcrypt');

module.exports.getUsers = async (req, res) => {
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

    // Password is valid, user is authenticated
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports.addUsers = async (req, res) => {
  const {v_id, name, email, password} = req.body;
  const user = await User.create({
    v_id, name, email, password
  })
  res.status(201).json(user)
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



