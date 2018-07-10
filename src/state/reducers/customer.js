import { FETCH_CUSTOMER } from 'state/actions/customerActions';

const initialState = {
  id: ''
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${FETCH_CUSTOMER}_FULFILLED`:
      return action.payload;
    default:
      return state;
  }
};
