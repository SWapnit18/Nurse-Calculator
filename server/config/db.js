// Only override DNS resolver if explicitly enabled in environment
if (process.env.USE_CUSTOM_DNS === 'true') {
  const dns = require('dns');
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  } catch (e) {}
}

const mongoose = require('mongoose');

// Disable command buffering so queries fail-fast to in-memory fallback if MongoDB is not reachable
mongoose.set('bufferCommands', false);

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nursecalc';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: process.env.NODE_ENV === 'test' ? 1000 : 5000,
      maxPoolSize: parseInt(process.env.MONGO_MAX_POOL_SIZE || '100', 10), // Up to 100 concurrent sockets
      minPoolSize: parseInt(process.env.MONGO_MIN_POOL_SIZE || '10', 10),  // 10 pre-warmed idle sockets
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      family: 4 // IPv4 fast-path resolution
    });
    console.log(`[NurseCalc DB] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (err) {
    console.warn(`[NurseCalc DB] MongoDB not detected (${err.message}). Defaulting to in-memory educational seed storage.`);
    return false;
  }
};

module.exports = connectDB;
