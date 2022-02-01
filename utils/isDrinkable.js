const dayjs = require('dayjs');

const currentDay = dayjs();

const getAge = (millesime) => {
  const date = dayjs(millesime.toString()).add(8, 'month');
  return currentDay.diff(date, 'year');
};

const isDrinkable = (millesime, guard) => {
  const age = getAge(millesime);
  switch (guard) {
    case 0:
      return true;

    case 1:
      if (age >= 3) {
        return true;
      } else {
        return false;
      }

    case 2:
      if (age >= 5) {
        return true;
      } else {
        return false;
      }

    case 3:
      return false;

    default:
      return false;
  }
};

module.exports = isDrinkable;
