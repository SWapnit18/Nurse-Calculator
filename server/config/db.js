const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nursecalc';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
    });
    console.log(`[NurseCalc DB] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (err) {
    console.warn(`[NurseCalc DB] MongoDB not detected locally (${err.message}). Defaulting to in-memory educational seed storage.`);
    return false;
  }
};

module.exports = connectDB;
