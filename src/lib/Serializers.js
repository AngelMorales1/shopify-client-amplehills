import memoize from 'lodash/memoize';
import get from 'lodash/get';

export const flavorFrenzy = memoize(function(data) {
  const rounds = get(data, 'rounds', []);
  const activeRound = rounds.find(round => round.isActive);

  const matches = rounds.reduce(
    (matches, round) => matches.concat(get(round, 'matches', [])),
    []
  );
  const flavors = Object.values(
    matches.reduce((flavors, match) => {
      const flavor1 = get(match, 'flavor1');
      const flavor2 = get(match, 'flavor2');

      if (flavor1) flavors[flavor1.slug] = flavor1;
      if (flavor2) flavors[flavor2.slug] = flavor2;

      return flavors;
    }, {})
  );

  return {
    ...data,
    activeRound,
    flavors
  };
});
