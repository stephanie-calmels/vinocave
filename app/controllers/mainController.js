const { Bottle } = require('../models');

module.exports = {
  home: (request, response) => {
    Bottle.findAll({
      include: 'appellation'
    }).then(bottles => {
      response.render('home', {bottles});
    }).catch(error => {
      console.log(error);
    });
  },
};
