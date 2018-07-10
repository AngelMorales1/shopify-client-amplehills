import { FETCH_USER } from 'state/actions/userActions';

const initialState = {
  id: 0
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${FETCH_USER}_FULFILLED`:
      return action.payload;
    default:
      return state;
  }
};
