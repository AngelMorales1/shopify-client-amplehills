import { GET_GENERIC_PAGE } from 'state/actions/genericPageActions';

const initialState = {
  genericPage: {}
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${GET_GENERIC_PAGE}_FULFILLED`:
      return {
        ...state,
        genericPage: action.payload
      };
    default:
      return state;
  }
};
