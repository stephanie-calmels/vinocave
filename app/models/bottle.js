const sequelize = require('../database');

const { DataTypes, Model } = require('sequelize');

class Bottle extends Model {}

Bottle.init({
  label: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Veuillez entrer un nom.'
      }
    }
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Veuillez sélectionner un type.'
      }
    }
  },
  millesime: {
    type: DataTypes.INTEGER,
    validate: {
      is: {
        args: /^(\d{4})$/gm,
        msg: 'Veuillez entrer une année valide.'
      }
    }
  },
  guard: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
      max: 20,
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      notNull: {
        msg: 'Veuillez indiquer une quantité.'
      }
    }
  },
  comment: {
    type: DataTypes.STRING,
  },
  note: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
      max: 5,
    }
  },
  rack: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: -1,
      max: 2,
    }
  },
  appellation_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Appellation',
      key: 'id'
    },
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Veuillez sélectionner une appellation.'
      }
    }
  }
}, 
{
  sequelize,
  tableName: 'bottle',
});

module.exports = Bottle;
