import { Days } from 'constants/Days.js';
import { abbreviateDay } from './abbreviateDay.js';

export const sortHours = openHours => {
  const sortByOpenHours = Days.reduce((accumulated, current) => {
    let time = openHours[current];
    accumulated[time]
      ? (accumulated[time] = accumulated[time].concat([current]))
      : (accumulated[time] = [current]);
    return accumulated;
  }, {});

  const sortAsPeriod = Object.keys(sortByOpenHours).reduce(
    (accumulated, current) => {
      let days = sortByOpenHours[current];

      if (
        days.includes(Days[0]) &&
        days.includes(Days[Days.length - 1]) &&
        days.length < 7
      ) {
        days.forEach((day, i) => {
          if (
            Days.indexOf(days[i + 1]) - Days.indexOf(day) !== 1 &&
            i !== days.length - 1
          ) {
            accumulated[current] = `${abbreviateDay(
              days[i + 1]
            )}–${abbreviateDay(day)}`;
          }
        });

        return accumulated;
      } else if (days.length === 7) {
        accumulated[current] = 'Everyday';
        return accumulated;
      }
      days.length > 1
        ? (accumulated[current] = `${abbreviateDay(days[0])}–${abbreviateDay(
            days[days.length - 1]
          )}`)
        : (accumulated[current] = abbreviateDay(days[0]));
      return accumulated;
    },
    {}
  );

  return sortAsPeriod;
};
