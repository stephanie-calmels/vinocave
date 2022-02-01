const { Bottle } = require('../models');
const { Op } = require('sequelize');
const logger = require('../../logger');

module.exports = {
  getOneBottle: async (request, response, next) => {
    try {
      const bottleId = request.params.id;
      const bottle = await Bottle.findByPk(bottleId, {
        include: 'appellation'
      });

      if (bottle) {
        response.render('bottle', {bottle});
      } else {
        response.status(404).render('404', {message: 'Cette bouteille n\'existe pas.'});
      }

    } catch (error) {
      logger.error(new Error(error))
      response.render('error', {message: 'Une erreur est survenue.'})
    }
  },

  addBottle: async (request, response, next) => {
      response.render('newBottle');
  },

  newBottle: async (request, response, next) => {
    const bottleInfo = {
      label: request.body.label ? request.body.label : null,
      appellation_id: request.body.appellation_id ? request.body.appellation_id : null,
      color: request.body.color,
      millesime: request.body.millesime,
      comment: request.body.comment,
      quantity: request.body.quantity ? request.body.quantity : null,
      guard: request.body.guard ? request.body.guard : null,
      rack: request.body.rack ? request.body.rack : null,
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
      // Traitement des erreurs de validation de sequelize
      if (error.name === 'SequelizeValidationError') {
        let errors = [];
        error.errors.forEach(element => {
          errors.push({
            path: element.path, 
            message: element.message
          });
        })
        response.render('newBottle', {errors, fields: request.body});
      } else {
        logger.error(new Error(error))
        response.render('error', {message: 'Une erreur est survenue.'})
      }
    }
  },

  updateBottle: async (request, response, next) => {
    const bottleInfo = {
      label: request.body.label ? request.body.label : null,
      appellation_id: request.body.appellation_id ? request.body.appellation_id : null,
      color: request.body.color,
      millesime: request.body.millesime,
      comment: request.body.comment,
      quantity: request.body.quantity ? request.body.quantity : null,
      guard: request.body.guard ? request.body.guard : null,
      rack: request.body.rack ? request.body.rack : null,
    }

    try {
      const bottleId = request.params.id;
      const currentBottle = await Bottle.findByPk(bottleId, {
        include: 'appellation'
      });

      if (currentBottle) {
        await currentBottle.update(bottleInfo);
        response.render('bottle', {bottle: currentBottle});
      } else {
        response.status(404).render('404', {message: 'Cette bouteille n\'existe pas.'});
      }

    } catch (error) {
      // Traitement des erreurs de validation de sequelize
      if (error.name === 'SequelizeValidationError') {
        let errors = [];
        error.errors.forEach(element => {
          errors.push({
            path: element.path, 
            message: element.message
          });
        })
        response.render('newBottle', {errors, fields: request.body});
      } else {
        logger.error(new Error(error))
        response.render('error', {message: 'Une erreur est survenue.'})
      }
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
      logger.error(new Error(error))
      response.render('error', {message: 'Une erreur est survenue.'})
    }
  },

  modifyBottle: async (request, response, next) => {
    try {
      const bottleId = request.params.id;
      const bottle = await Bottle.findByPk(bottleId, {
        include: 'appellation'
      });

      if (bottle) {
        response.render('updateBottle', {bottle});
      } else {
        response.status(404).render('404', {message: 'Cette bouteille n\'existe pas.'});
      }

    } catch (error) {
      logger.error(new Error(error))
      response.render('error', {message: 'Une erreur est survenue.'})
    }
  },
  
  drinkBottle: async (request, response, next) => {
    try {
      const bottleId = request.params.id;
      const currentBottle = await Bottle.findByPk(bottleId, {
        include: 'appellation'
      });

      if (currentBottle && currentBottle.quantity > 0) {
        const bottleInfo = {
          quantity: currentBottle.quantity - 1,
        }
        await currentBottle.update(bottleInfo);
        response.render('bottle', {bottle: currentBottle});

      } else if (currentBottle && currentBottle.quantity === 0) {
        response.status(404).render('404', {message: 'Cette bouteille n\'est plus en stock.'});

      } else {
        response.status(404).render('404', {message: 'Cette bouteille n\'existe pas.'});
      }

    } catch (error) {
      logger.error(new Error(error))
      response.render('error', {message: 'Une erreur est survenue.'})
    }
  },

  noteBottle: async (request, response, next) => {
    try {
      const bottleId = request.params.id;
      const currentBottle = await Bottle.findByPk(bottleId, {
          include: 'appellation'
        });

      if (currentBottle) {
        const bottleInfo = {
          note: request.body.note,
        }
    
        await currentBottle.update(bottleInfo);
        response.render('bottle', {bottle: currentBottle});
        
      } else {
        response.status(404).render('404', {message: 'Cette bouteille n\'existe pas.'});
      }

    } catch (error) {
      logger.error(new Error(error))
      response.render('error', {message: 'Une erreur est survenue.'})
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

      if (results.length > 0) {
        response.render('home', {bottles: results, title: "Résultats"});
      } else {
        response.render('home', {bottles: [], title: "Aucun résultat"});
      }
  
    } catch (error) {
      logger.error(new Error(error))
      response.render('error', {message: 'Une erreur est survenue.'})
    }
  },

  buyBottle: async (request, response, next) => {
    try {
      if (parseInt(request.body.quantity, 10) < 1) {
        throw new Error('Quantity must be > 0');
        
      } else {
        const bottleId = request.params.id;
        const currentBottle = await Bottle.findByPk(bottleId, {
          include: 'appellation'
        });
  
        if (currentBottle) {
          const bottleInfo = {
            quantity: parseInt(currentBottle.quantity, 10) + parseInt(request.body.quantity, 10),
          }
          await currentBottle.update(bottleInfo);
          response.render('bottle', {bottle: currentBottle});
  
        } else {
          response.status(404).render('404', {message: 'Cette bouteille n\'existe pas.'});
        }
      }
    } catch (error) {
      logger.error(new Error(error))
      response.render('error', {message: 'Une erreur est survenue.'})
    }
  },
};
