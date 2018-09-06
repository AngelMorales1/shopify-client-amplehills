import { GET_EVENTS } from 'state/actions/eventsActions';

const initialState = {
  events: {}
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${GET_EVENTS}_FULFILLED`:
      return {
        ...state,
        events: action.payload
      };
    default:
      return state;
  }
};
