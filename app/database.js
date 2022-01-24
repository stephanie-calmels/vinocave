const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  define: {
    underscored: true,
    timestamps: false
  }
});

module.exports = sequelize;
