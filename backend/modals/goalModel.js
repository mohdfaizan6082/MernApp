const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  
  user : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref: 'User'
  },
  v_id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String
  },
},
{
  timestamps: true
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
