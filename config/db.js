const config = require('config');
const db = config.get('mongoURI');
const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('MONGO DB CONNECTED');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
module.exports = connectDB;
