import { FETCH_PARTY_ADDONS } from 'state/actions/partyRequestFormActions';

const initialState = {
  partyAddons: {}
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${FETCH_PARTY_ADDONS}_FULFILLED`:
      return {
        ...state,
        partyAddons: action.payload
      };
    default:
      return state;
  }
};
