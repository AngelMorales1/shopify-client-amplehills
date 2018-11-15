import { Days } from 'constants/Days.js';
import { abbreviateDay } from './abbreviateDay.js';
import get from 'utils/get';

const getDayRange = daysWithSameHours => {
  return daysWithSameHours.length > 1
    ? `${abbreviateDay(daysWithSameHours.shift())}–${abbreviateDay(
        daysWithSameHours.pop()
      )}`
    : abbreviateDay(daysWithSameHours.pop());
};

export default openHours => {
  const allSortedDays = [];

  Days.reduce((openHoursSortedByTime, day) => {
    const time = get(openHours, day, 'close');
    const timeRange = Object.keys(openHoursSortedByTime)[0];

    if (timeRange) {
      if (openHoursSortedByTime[time]) {
        openHoursSortedByTime[time].push(day);
      } else {
        const sortedDays = getDayRange(openHoursSortedByTime[timeRange]);
        allSortedDays.push({ [sortedDays]: timeRange });
        openHoursSortedByTime = {};
        openHoursSortedByTime[time] = [day];
      }
    } else {
      openHoursSortedByTime[time] = [day];
    }

    if (day === Days[Days.length - 1]) {
      const lastTimeRange = Object.keys(openHoursSortedByTime)[0];
      if (
        openHoursSortedByTime[lastTimeRange] &&
        openHoursSortedByTime[lastTimeRange].length === 7
      ) {
        allSortedDays.push({ Everyday: lastTimeRange });
      } else {
        const sortedDays = getDayRange(openHoursSortedByTime[lastTimeRange]);
        allSortedDays.push({ [sortedDays]: lastTimeRange });
      }
    }

    return openHoursSortedByTime;
  }, {});

  return allSortedDays;
};
