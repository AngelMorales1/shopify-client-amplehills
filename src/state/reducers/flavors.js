import { GET_FLAVORS } from 'state/actions/flavorsActions';

const initialState = {
  flavors: []
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${GET_FLAVORS}_FULFILLED`:
      return {
        ...state,
        flavors: action.payload
      };
    default:
      return state;
  }
};
