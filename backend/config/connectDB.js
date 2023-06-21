const mongoose = require('mongoose');
const Db_Name = process.env.DB_NAME;
const Db_Password = process.env.DB_PASSWORD;

module.exports.connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${Db_Name}:${Db_Password}@cluster0.rnnwrby.mongodb.net/MernApp?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB DataBase');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};