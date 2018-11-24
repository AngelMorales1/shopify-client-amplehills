import moment from 'moment-timezone';

import { GET_AVAILABILITY } from 'state/actions/bookingsActions';

const initialState = {
  availabilities: {},
  disabledDays: {}
};

const isSameDay = (dt1, dt2) => {
  return (
    dt1.date() === dt2.date() &&
    dt1.month() === dt2.month() &&
    dt1.year() === dt2.year()
  );
};

const makeDisabledDays = availabilityData => {
  let disabledDays = (availabilityData || []).reduce(
    (set, availability) => {
      const zone = set.today
        ? set.today.tz()
        : availability.resources[0].timezone;
      /* If today isn't set, set it */
      if (!set.today) {
        set.today = moment.tz(zone);
        /* Backfill dates that are in the past for the first month */
        for (let i = 1; i < set.today.date(); i++) {
          let pad = `${i}`.length === 1;
          set.disabledDays.push(
            moment.tz(
              `${set.today.format('YYYY-MM')}-${pad ? '0' : ''}${i}`,
              zone
            )
          );
        }
        /* Add today as disabled if the current availability isn't on today */
        if (!isSameDay(availability.startMoment, set.today))
          set.disabledDays.push(set.today);
      }
      /* Check if the previously seen date (or today) is a different day to the availability.
      * if it is, backfill the time between the availability & the comparison date,
      * as these are disabled days.
      */
      let compareTo = set.lastSeen ? set.lastSeen : set.today;
      while (!isSameDay(availability.startMoment, compareTo)) {
        compareTo = compareTo.clone().add(1, 'day');
        if (!isSameDay(availability.startMoment, compareTo))
          set.disabledDays.push(compareTo);
      }
      set.lastSeen = availability.startMoment;
      return set;
    },
    { disabledDays: [], lastSeen: null, today: null }
  ).disabledDays;

  /* Fill our the remainder of the month as disabled */
  const lastDisabledDay = disabledDays[disabledDays.length - 1];
  if (lastDisabledDay) {
    for (
      let i = lastDisabledDay.date() + 1;
      i <= lastDisabledDay.daysInMonth();
      i++
    ) {
      let pad = `${i}`.length === 1;
      disabledDays.push(
        moment.tz(
          `${lastDisabledDay.format('YYYY-MM')}-${pad ? '0' : ''}${i}`,
          lastDisabledDay.tz()
        )
      );
    }
  }

  return disabledDays;
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${GET_AVAILABILITY}_FULFILLED`:
      const newState = { ...state };
      newState.availabilities[action.meta.projectId] = action.payload.map(
        availability => {
          return {
            ...availability,
            startMoment: moment.tz(
              availability.start,
              availability.resources[0].timezone
            ),
            endMoment: moment.tz(
              availability.end,
              availability.resources[0].timezone
            )
          };
        }
      );
      newState.disabledDays[action.meta.projectId] = makeDisabledDays(
        newState.availabilities[action.meta.projectId]
      );
      return newState;
    default:
      return state;
  }
};
