const { Bottle, Appellation } = require('../models');
const guard = require('../../ressources/guard.json');

module.exports = {
  getOneBottle: async (request, response, next) => {
    try {
      const bottleId = request.params.id;
      const bottle = await Bottle.findByPk(bottleId, {
        include: 'appellation'
      });

      if (bottle) {
        response.render('bottle', {bottle, guard});
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
        response.render('newBottle', {appellations, guard});
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
    const bottleInfo = {
      label: request.body.label,
      appellation_id: request.body.appellation_id,
      color: request.body.color,
      millesime: request.body.millesime,
      comment: request.body.comment,
      quantity: request.body.quantity,
      guard: request.body.guard.length > 0 ? request.body.guard : null,
      rack: request.body.rack.length > 0 ? request.body.rack : null,
    }
    try {
      const result = await Bottle.create(bottleInfo);

      if (result) {
        const newBottle = await Bottle.findByPk(result.id, {
          include: 'appellation'
        });
        response.render('bottle', {bottle: newBottle});
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
    const bottleInfo = {
      label: request.body.label,
      appellation_id: request.body.appellation_id,
      color: request.body.color,
      millesime: request.body.millesime,
      comment: request.body.comment,
      quantity: request.body.quantity,
      guard: request.body.guard.length > 0 ? request.body.guard : null,
      rack: request.body.rack.length > 0 ? request.body.rack : null,
    }

    try {
      const bottleId = request.params.id;
      const currentBottle = await Bottle.findByPk(bottleId);

      if (currentBottle) {
        const result = await currentBottle.update(bottleInfo);
        const bottle = await Bottle.findByPk(result.id, {
          include: 'appellation'
        });
        response.render('bottle', {bottle, guard});
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
      const bottle = await Bottle.findByPk(bottleId, {
        include: 'appellation'
      });

      if (bottle) {
        const appellations = await Appellation.findAll();

        if (appellations) {
          response.render('updateBottle', {appellations, bottle, guard});
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
