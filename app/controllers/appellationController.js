const { Appellation } = require('../models');
const guard = require('../../ressources/guard.json');

module.exports = {
  getAppellations: async (request, response, next) => {
    try {
      const appellations = await Appellation.findAll({
        include: 'bottles'
      });
  
      if (appellations) {
        response.render('search', {appellations, guard});
      } else {
        next();
      }

    } catch (error) {
      response.status(500).json({
        "error": error.message
      });
    }
  },

  getOneAppellation: async (request, response, next) => {
    try {
      const appellationId = request.params.id;
      const appellation = await Appellation.findByPk(appellationId, {
        include: 'bottles'
      });

      if (appellation) {
        response.json(appellation);
      } else {
        next();
      }

    } catch (error) {
      response.status(500).json({
        "error": error.message
      });
    }
  },

}