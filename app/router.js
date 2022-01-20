const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');
const bottleController = require('./controllers/bottleController');
const appellationController = require('./controllers/appellationController');

// page d'accueil
router.get('/', mainController.home);

// détail d'une bouteille
router.get('/bouteille/:id', bottleController.getOneBottle);

// affichage du formulaire de modification d'une bouteille
router.get('/maj-bouteille/:id', bottleController.modifyBottle);
// traitement du formulaire
router.post('/maj-bouteille/:id', bottleController.updateBottle);
// sortir une bouteille du stock
router.get('/boire-bouteille/:id', bottleController.drinkBottle);
// suppression d'une bouteille
router.get('/suppr-bouteille/:id', bottleController.deleteBottle);

// affichage du formulaire d'ajout de bouteille
router.get('/nouvelle_bouteille', bottleController.addBottle);
// traitement du formulaire
router.post('/nouvelle_bouteille', bottleController.newBottle);

// liste des appellations
router.get('/appellation', appellationController.getAppellations);

// détail d'une appellation 
router.get('/appellation/:id', appellationController.getOneAppellation);

module.exports = router;
