const Bottle = require('./bottle');
const Appellation = require('./appellation');

Bottle.belongsTo(Appellation, {
  foreignKey: 'appellation_id',
  as: 'appellation'
});

Appellation.hasMany(Bottle, {
  foreignKey: 'appellation_id',
  as: 'bottles'
});

module.exports = {
  Bottle,
  Appellation,
};
