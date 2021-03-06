require('dotenv').config();
const express = require('express');
const dayjs = require('dayjs');

const router = require('./app/router');
const { Appellation } = require('./app/models');
const guard = require('./ressources/guard.json');
const colors = require('./ressources/colors.json');
const racks = require('./ressources/racks.json');
const isDrinkable = require('./utils/isDrinkable');

const app = express();

// ressources statiques
app.use(express.static('./public'));

// gestion des templates
app.set('view engine', 'ejs');
app.set('views', './app/views');

// middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use((request, response, next) => {
  // Stockage de variables en local pour les rendre dispo dans toute l'application
  if (!app.locals.appellations) {
    Appellation.findAll({
      order: [
        ['label', 'ASC'],
      ]
    }).then(results => {
      app.locals.appellations = results;
    }).catch(error => {
      logger.error(new Error(error))
      response.render('error', {message: 'Une erreur est survenue.'})
    });
  }
  
  if (!app.locals.guard) {
    app.locals.guard = guard;
  }

  if (!app.locals.colors) {
    app.locals.colors = colors;
  }

  if (!app.locals.year) {
    app.locals.year = dayjs().year();
  }

  if (!app.locals.isDrinkable) {
    app.locals.isDrinkable = isDrinkable;
  }

  if (!app.locals.racks) {
    app.locals.racks = racks;
  }


  next();
});

// router
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
