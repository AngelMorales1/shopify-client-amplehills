import { GET_PRESS_PAGE } from 'state/actions/pressPageActions';

const initialState = {
  pressPage: {}
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${GET_PRESS_PAGE}_FULFILLED`:
      return {
        ...state,
        pressPage: action.payload
      };
    default:
      return state;
  }
};
