const { Bottle } = require('../models');
const { Op } = require('sequelize');

module.exports = {
  home: (request, response) => {
    Bottle.findAll({
      where: {
        quantity: {
          [Op.gt]: 0,
        }
      },
      include: 'appellation'
    }).then(bottles => {
      response.render('home', {bottles});
    }).catch(error => {
      console.log(error);
    });
  },
};
