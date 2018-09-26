import { FETCH_NEWS } from 'state/actions/newsActions';

const initialState = {
  news: {}
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${FETCH_NEWS}_FULFILLED`:
      return {
        ...state,
        news: action.payload
      };
    default:
      return state;
  }
};
