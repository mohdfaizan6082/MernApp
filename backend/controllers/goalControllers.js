const asyncHandler = require('express-async-handler')
const Goal = require('../modals/goalModel.js')


module.exports.getGoals = async (req, res) => {
  // const goals = await Goal.find().populate('user');
  // res.status(200).json(goals);

  try {
    const goals = await Goal.find({user : req.user._id}).populate('user');
if (!goals) {
  return res.status(404).json({ message: 'Goal not found' });
}
  res.status(200).json(goals);
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while updating the goal' });
  }
};

module.exports.getGoalsById = async (req, res) => {
  try {
    const goalId = req.params.id;
    const goals = await Goal.findById(goalId);
if (!goals) {
  return res.status(404).json({ message: 'Goal not found' });
}
  res.status(200).json(goals);
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while updating the goal' });
  }
  
};

module.exports.addGoals = async (req, res) => {
  const { v_id, title } = req.body;
  const goal = await Goal.create({
    user : req.user._id,
    v_id: req.body.v_id,
    title: req.body.title
  })
  res.status(201).json(goal)
};

module.exports.updateGoals = async (req, res) => {
  try {
    const goalId = req.params.id;
    const updatedFields = req.body;

    // Find the goal by ID and update it
    const updatedGoal = await Goal.findByIdAndUpdate(goalId, updatedFields, { new: true });

    if (!updatedGoal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    return res.status(200).json(updatedGoal);
  } catch (error) {
    console.error('Error updating goal:', error);
    return res.status(500).json({ message: 'An error occurred while updating the goal' });
  }
};

module.exports.deleteGoals = async (req, res) => {
  try {
    const goalId = req.params.id;

    // Find the goal by ID and delete it
    const deletedGoal = await Goal.findByIdAndDelete(goalId);

    if (!deletedGoal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    return res.status(200).json({ message: 'Record Deleted' });
  } catch (error) {
    console.error('Error deleting goal:', error);
    return res.status(500).json({ message: 'An error occurred while deleting the goal' });
  }
};
