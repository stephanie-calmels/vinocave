const { Appellation } = require('../models');
const guard = require('../../ressources/guard.json');

module.exports = {
  getAppellations: async (request, response, next) => {
    try {
      const appellations = await Appellation.findAll({
        include: 'bottles',
        order: [
          ['label', 'ASC'],
        ]
  
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
  }
}