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

export const inStores = memoize(function(data) {
  const title = get(data, 'title');
  const body = get(data, 'body');
  const noResults = {
    title: get(data, 'noResultsTitle'),
    body: get(data, 'noResultsBody')
  };

  return { title, body, noResults };
});

export const retailLocations = memoize(function(data) {
  return Array.isArray(data)
    ? data.map(location => retailLocation(location))
    : [];
});

export const retailLocation = memoize(function(data) {
  const name = get(data, 'name');
  const address = get(data, 'address');
  const city = get(data, 'city');
  const state = get(data, 'state');
  const zip = get(data, 'zip');
  const distributor = get(data, 'distributor');
  const geopoint = get(data, 'geopoint');
  const tags = get(data, 'tags');

  return { name, address, city, state, zip, distributor, geopoint, tags };
});

export const products = memoize(function(data) {
  return data;
});

export const flavors = memoize(function(data) {
  return data;
});
