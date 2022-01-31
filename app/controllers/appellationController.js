const { Appellation } = require('../models');
const guard = require('../../ressources/guard.json');
const logger = require('../../logger');

module.exports = {
  getAppellations: async (request, response, next) => {
    try {
      const appellations = await Appellation.findAll({
        include: 'bottles',
        order: [
          ['label', 'ASC'],
        ]
  
      });
  
      response.render('search', {appellations, guard});

    } catch (error) {
      logger.error(new Error(error))
      response.render('error', {message: 'Une erreur est survenue.'})
    }
  }
}