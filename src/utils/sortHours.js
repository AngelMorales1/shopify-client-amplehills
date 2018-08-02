import { Days } from 'constants/Days.js';
import { abbreviateDay } from './abbreviateDay.js';

const getPeriod = daysWithSameHours => {
  return daysWithSameHours.length > 1
    ? `${abbreviateDay(daysWithSameHours.shift())}–${abbreviateDay(
        daysWithSameHours.pop()
      )}`
    : abbreviateDay(daysWithSameHours.pop());
};

export default openHours => {
  let allSortedDays = [];

  const sortByHours = Days.reduce((accumulated, day) => {
    let time = openHours[day];
    let hours = Object.keys(accumulated)[0];

    if (hours) {
      if (accumulated[time]) {
        accumulated[time].push(day);
      } else {
        let sortedDays = getPeriod(accumulated[hours]);
        allSortedDays.push({ [sortedDays]: hours });
        accumulated = {};
        accumulated[time] = [day];
      }
    } else {
      accumulated[time] = [day];
    }

    if (accumulated[hours] && accumulated[hours].length === 7) {
      allSortedDays.push({ Everyday: hours });
    } else if (day === Days[Days.length - 1]) {
      if (!accumulated[time]) {
        accumulated[time] = [day];
      }

      let sortedDays = getPeriod(accumulated[time]);
      allSortedDays.push({ [sortedDays]: hours });
    }

    return accumulated;
  }, {});

  console.log(allSortedDays);
  return allSortedDays;
};
