import { GET_EVENT_PAGE } from 'state/actions/eventPageActions';

const initialState = {
  eventPageData: {}
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${GET_EVENT_PAGE}_FULFILLED`:
      return {
        ...state,
        events: action.payload
      };
    default:
      return state;
  }
};
