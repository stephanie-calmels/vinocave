const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');
const bottleController = require('./controllers/bottleController');

// page d'accueil
router.get('/', mainController.home);

// détail et suppression d'une bouteille
router.get('/bouteille/:id', bottleController.getOneBottle);
router.delete('/bouteille/:id', bottleController.deleteBottle);

// affichage du formulaire de modification d'une bouteille
router.get('/maj-bouteille/:id', bottleController.modifyBottle);
// traitement du formulaire
router.post('/maj-bouteille/:id', bottleController.updateBottle);


// affichage du formulaire d'ajout de bouteille
router.get('/nouvelle_bouteille', bottleController.addBottle);
// traitement du formulaire
router.post('/nouvelle_bouteille', bottleController.newBottle);

module.exports = router;
