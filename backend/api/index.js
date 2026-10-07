require('dotenv').config();

const app = require('../app');
const connectDB = require('../config/db');

let connectionPromise = null;

module.exports = async (req, res) => {
  if (!connectionPromise) {
    connectionPromise = connectDB().catch((err) => {
      connectionPromise = null;
      throw err;
    });
  }

  try {
    await connectionPromise;
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database connection failed' });
    return;
  }

  app(req, res);
};
