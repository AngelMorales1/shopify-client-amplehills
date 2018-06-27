import Data from 'lib/Data';

export const FETCH_OUR_PLEDGE = 'FETCH_OUR_PLEDGE';
export const fetchOurPledge = payload => dispatch => {
  return dispatch({
    type: FETCH_OUR_PLEDGE,
    payload: Data.getEntries({
      content_type: 'ourPledge'
    })
  });
};
