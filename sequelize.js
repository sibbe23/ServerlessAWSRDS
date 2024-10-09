// sequelize.js
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config(); // Load environment variables

const sequelize = new Sequelize(
  process.env.MYSQL_DB, 
  process.env.MYSQL_USER, 
  process.env.MYSQL_PASSWORD, 
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
  }
);

// Define User model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'users', // Ensures it uses the existing 'users' table
  timestamps: false,  // Set to true if using createdAt/updatedAt columns
});

module.exports = { sequelize, User };
