const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  define: {
    underscored: true,
    timestamps: false
  },
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  }
});

module.exports = sequelize;
