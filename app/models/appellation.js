const sequelize = require('../database');

const { DataTypes, Model } = require('sequelize');

class Appellation extends Model {}

Appellation.init({
  label: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Veuillez choisir une appellation'
      }
    }
  },
}, 
{
  sequelize,
  tableName: 'appellation',
});

module.exports = Appellation;
