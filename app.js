require('dotenv').config();
const express = require('express');

const router = require('./app/router');

const app = express();

// ressources statiques
app.use(express.static('./public'));

// gestion des templates
app.set('view engine', 'ejs');
app.set('views', './app/views');

// middlewares
app.use(express.json());

// router
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
