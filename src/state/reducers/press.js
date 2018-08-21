import { GET_PRESS_DATA } from 'state/actions/pressActions';

const initialState = {
  press: {}
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${GET_PRESS_DATA}_FULFILLED`:
      return {
        ...state,
        press: action.payload
      };
    default:
      return state;
  }
};
