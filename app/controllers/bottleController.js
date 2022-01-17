const { Bottle, Appellation } = require('../models');

module.exports = {
  getOneBottle: async (request, response, next) => {
    try {
      const bottleId = request.params.id;
      const bottle = await Bottle.findByPk(bottleId);

      if (bottle) {
        response.json(bottle);
      } else {
        next();
      }

    } catch (error) {
      response.status(500).json({
        "error": error.message
      });
    }
  },

  addBottle: async (request, response, next) => {
    try {
      const appellations = await Appellation.findAll();

      if (appellations) {
        response.json(appellations);
      } else {
        next();
      }
      
    } catch (error) {
      response.status(500).json({
        "error": error.message
      });
    }
  },

  newBottle: async (request, response, next) => {
    try {
      const result = await Bottle.create(request.body);

      if (result) {
        const newBottle = await Bottle.findByPk(result.id, {
          include: 'appellation'
        });
        response.json(newBottle);
      } else {
        next();
      }

    } catch (error) {
      response.status(500).json({
        "error": error.message
      });
    }
  },

  updateBottle: async (request, response, next) => {
    try {
      const bottleId = request.params.id;
      const currentBottle = await Bottle.findByPk(bottleId);

      if (currentBottle) {
        const result = await currentBottle.update(request.body);
        const updatedBottle = await Bottle.findByPk(result.id, {
          include: 'appellation'
        });
        response.json(updatedBottle);
      } else {
        next();
      }

    } catch (error) {
      response.status(500).json({
        "error": error.message
      });
    }
  },

  deleteBottle: async (request, response, next) => {
    try {
      const bottleId = request.params.id;
      const deleted = await Bottle.destroy({
        where: {
          id: bottleId
        }
      });

      if (deleted) {
        response.json('Suppression effectuée');
      } else {
        next();
      }

    } catch (error) {
      response.status(500).json({
        "error": error.message
      });
    }
  },

  modifyBottle: async (request, response, next) => {
    try {
      const bottleId = request.params.id;
      const bottle = await Bottle.findByPk(bottleId);

      if (bottle) {
        const appellations = await Appellation.findAll();

        if (appellations) {
          response.json({appellations, bottle});
        } else {
          next();
        }

      } else {
        next();
      }

    } catch (error) {
      response.status(500).json({
        "error": error.message
      });
    }

  }
};
