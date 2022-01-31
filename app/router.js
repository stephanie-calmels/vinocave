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
// attribuer une note à une bouteille
router.post('/note-bouteille/:id', bottleController.noteBottle);

// affichage du formulaire d'ajout de bouteille
router.get('/nouvelle_bouteille', bottleController.addBottle);
// traitement du formulaire
router.post('/nouvelle_bouteille', bottleController.newBottle);

// filtre par type
router.get('/vins/:color', mainController.colorFilter);

// affichage du formulaire de recherche
router.get('/recherche', appellationController.getAppellations);
// traitement du formulaire
router.post('/recherche', bottleController.searchBottle);

// 404
router.use(mainController.notFound);

module.exports = router;
