import { client as Apollo } from 'lib/Apollo';

import { fetchPartyAddonsQuery } from 'state/graphql/partyAddons';

export const FETCH_PARTY_ADDONS = 'FETCH_PARTY_ADDONS';
export const fetchPartyAddons = payload => dispatch => {
  return dispatch({
    type: FETCH_PARTY_ADDONS,
    payload: Apollo.query({
      query: fetchPartyAddonsQuery
    })
  });
};
