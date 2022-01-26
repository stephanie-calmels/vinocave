const { Bottle, Appellation } = require('../models');
const guard = require('../../ressources/guard.json');
const { Op } = require('sequelize');

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
      const appellations = await Appellation.findAll({
        order: [
          ['label', 'ASC'],
        ]
      });

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
      guard: request.body.guard ? request.body.guard : null,
      rack: request.body.rack ? request.body.rack : null,
    }
    try {
      const result = await Bottle.create(bottleInfo);

      if (result) {
        const newBottle = await Bottle.findByPk(result.id, {
          include: 'appellation'
        });
        response.render('bottle', {bottle: newBottle, guard});
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
      guard: request.body.guard ? request.body.guard : null,
      rack: request.body.rack ? request.body.rack : null,
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
        response.redirect('/');
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
        const appellations = await Appellation.findAll({
          order: [
            ['label', 'ASC'],
          ]
        });

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
  },
  
  drinkBottle: async (request, response, next) => {
    try {
      const bottleId = request.params.id;
      const currentBottle = await Bottle.findByPk(bottleId);

      if (currentBottle && currentBottle.quantity > 0) {
        const bottleInfo = {
          quantity: currentBottle.quantity - 1,
        }
    
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

  noteBottle: async (request, response, next) => {
    try {
      const bottleId = request.params.id;
      const currentBottle = await Bottle.findByPk(bottleId);

      if (currentBottle) {
        const bottleInfo = {
          note: request.body.note,
        }
    
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

  searchBottle: async (request, response, next) => {
    // objet construit à partir des champs du formulaire qui ont été remplis
    const bottleInfo = {
      label: request.body.label,
      appellation_id: request.body.appellation_id ? request.body.appellation_id : null,
      color: request.body.color ? request.body.color : null,
      millesime: request.body.millesime.lenght > 0 ? request.body.millesime : null,
      note: request.body.note ? request.body.note : null,
      quantity: request.body.quantity ? request.body.quantity : null,
      guard: request.body.guard ? request.body.guard : null,
      rack: request.body.rack ? request.body.rack : null,
    }

    // objet de config de base à passer en paramètre de la requête
    let config = {
      where: {
        label: {[Op.like]: `%${bottleInfo.label}%`}
      },
      include: 'appellation',
      order: [
        ['guard', 'ASC'],
        ['color', 'ASC'],
        ['appellation_id', 'ASC'],
        ['quantity', 'DESC'],
      ]
    };

    // pour chaque champ de formulaire rempli, on ajoute la propriété à l'objet de config pour affiner la recherche
    if (bottleInfo.appellation_id) {
      config.where.appellation_id = bottleInfo.appellation_id;
    }  
    if (bottleInfo.color) {
      config.where.color = {[Op.like]: `%${bottleInfo.color}%`}
    }
    if (bottleInfo.millesime) {
      config.where.millesime = bottleInfo.millesime;
    }  
    if (bottleInfo.note) {
      config.where.note = bottleInfo.note;
    }  
    if (bottleInfo.guard) {
      config.where.guard = bottleInfo.guard;
    }  
    if (bottleInfo.rack) {
      config.where.rack = bottleInfo.rack;
    }  

    try {
      const results = await Bottle.findAll(config);

      if (results) {
        response.render('home', {bottles: results, title: "Résultats"});
      } else {
        next();
      }
  
    } catch (error) {
      response.status(500).json({
        "error": error.message
      });
    }
  },
};
