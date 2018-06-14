let DaysInOrder = {
  SUNDAY: 'sunday',
  MONDAY: 'monday',
  TUESDAY: 'tuesday',
  WEDNESDAY: 'wednesday',
  THURSDAY: 'thursday',
  FRIDAY: 'friday',
  SATURDAY: 'saturday'
};

const sortHours = fields => {
  const weeksInOrder = [
    DaysInOrder.SUNDAY,
    DaysInOrder.MONDAY,
    DaysInOrder.TUESDAY,
    DaysInOrder.WEDNESDAY,
    DaysInOrder.THURSDAY,
    DaysInOrder.FRIDAY,
    DaysInOrder.SATURDAY
  ];

  const openHours = Object.keys(fields)
    .filter(field => field.includes('day'))
    .reduce((acc, cur) => {
      acc[cur] = fields[cur];
      return acc;
    }, {});

  const sortByOpenHours = weeksInOrder.reduce((acc, cur) => {
    let time = openHours[cur];
    acc[time] ? (acc[time] = acc[time].concat([cur])) : (acc[time] = [cur]);
    return acc;
  }, {});

  const sortAsPeriod = Object.keys(sortByOpenHours).reduce((acc, cur) => {
    let days = sortByOpenHours[cur];

    if (
      days.includes(weeksInOrder[0]) &&
      days.includes(weeksInOrder[weeksInOrder.length - 1]) &&
      days.length < 7
    ) {
      days.forEach((day, idx) => {
        if (
          weeksInOrder.indexOf(days[idx + 1]) - weeksInOrder.indexOf(day) !==
            1 &&
          idx !== days.length - 1
        ) {
          acc[cur] = `${abbreviateDay(days[idx + 1])}–${abbreviateDay(day)}`;
        }
      });

      return acc;
    } else if (days.length === 7) {
      acc[cur] = 'Everyday';
      return acc;
    }
    days.length > 1
      ? (acc[cur] = `${abbreviateDay(days[0])}–${abbreviateDay(
          days[days.length - 1]
        )}`)
      : (acc[cur] = abbreviateDay(days[0]));
    return acc;
  }, {});

  return sortAsPeriod;
};

const abbreviateDay = str => {
  return str[0].toUpperCase() + str.slice(1, 3);
};

export { sortHours, abbreviateDay };
