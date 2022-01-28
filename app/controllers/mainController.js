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
      include: 'appellation',
      order: [
        ['guard', 'ASC'],
        ['color', 'ASC'],
        ['appellation_id', 'ASC'],
        ['quantity', 'DESC'],
      ]
    }).then(bottles => {
      response.render('home', {
        bottles, 
        title: "Toutes les bouteilles"});
    }).catch(error => {
      console.log(error);
    });
  },

  colorFilter: (request, response) => {
    const color = request.params.color;
    let type = '';
    if (color === 'blanc') {
      type = 'blancs'
    }
    if (color === 'rose') {
      type = 'rosés'
    }
    if (color === 'rouge') {
      type = 'rouges'
    }

    Bottle.findAll({
      where: {
        color
      },
      include: 'appellation',
      order: [
        ['guard', 'ASC'],
        ['appellation_id', 'ASC'],
        ['quantity', 'DESC'],
      ]
    }).then(bottles => {
      response.render('home', {
        bottles,
        title: `Tous les vins ${type}`
      });
    }).catch(error => {
      console.log(error);
    });
  },

  notFound: (request, response) => {
    response.status(404).render('404', {message: 'Cette page n\'existe pas.'});
  }
};
