const { Bottle } = require('../models');
const { Op } = require('sequelize');
const logger = require('../../logger');

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
      logger.error(new Error(error))
      response.render('error', {message: 'Une erreur est survenue.'})
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
      logger.error(new Error(error))
      response.render('error', {message: 'Une erreur est survenue.'})
    });
  },

  notFound: (request, response) => {
    response.status(404).render('404', {message: 'Cette page n\'existe pas.'});
  }
};
