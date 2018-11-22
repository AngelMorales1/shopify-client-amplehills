import { GET_AVAILABILITY } from 'state/actions/bookingsActions';

const initialState = {
  availabilities: {}
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${GET_AVAILABILITY}_FULFILLED`:
      const newState = { ...state };
      newState.availabilities[action.meta.projectId] = action.payload;
      return newState;
    default:
      return state;
  }
};
