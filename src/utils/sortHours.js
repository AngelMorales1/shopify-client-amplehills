import { Days } from 'constants/Days.js';
import { abbreviateDay } from './abbreviateDay.js';

const getDayRange = daysWithSameHours => {
  return daysWithSameHours.length > 1
    ? `${abbreviateDay(daysWithSameHours.shift())}–${abbreviateDay(
        daysWithSameHours.pop()
      )}`
    : abbreviateDay(daysWithSameHours.pop());
};

export default openHours => {
  let allSortedDays = [];

  Days.reduce((accumulated, day) => {
    let time = openHours[day];
    let timeRange = Object.keys(accumulated)[0];

    if (timeRange) {
      if (accumulated[time]) {
        accumulated[time].push(day);
      } else {
        let sortedDays = getDayRange(accumulated[timeRange]);
        allSortedDays.push({ [sortedDays]: timeRange });
        accumulated = {};
        accumulated[time] = [day];
      }
    } else {
      accumulated[time] = [day];
    }

    if (accumulated[timeRange] && accumulated[timeRange].length === 7) {
      allSortedDays.push({ Everyday: timeRange });
    } else if (day === Days[Days.length - 1]) {
      if (!accumulated[time]) {
        accumulated[time] = [day];
      }

      let sortedDays = getDayRange(accumulated[time]);
      allSortedDays.push({ [sortedDays]: timeRange });
    }

    return accumulated;
  }, {});

  return allSortedDays;
};
