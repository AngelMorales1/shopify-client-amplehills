import { client as Apollo } from 'lib/Apollo';
import { customerAccessTokenCreate, customerFetch } from 'state/graphql/user';
import get from 'utils/get';

export const SIGN_IN_USER = 'SIGN_IN_USER';
export const signInUser = payload => dispatch => {
  return dispatch({
    type: SIGN_IN_USER,
    payload: new Promise(resolve => {
      Apollo.mutate({
        mutation: customerAccessTokenCreate,
        variables: { input: payload }
      }).then(customerAccessToken => {
        const accessToken = get(
          customerAccessToken,
          'data.customerAccessTokenCreate.customerAccessToken.accessToken',
          ''
        );
        dispatch(fetchUser(accessToken)).then(response => resolve(response));
      });
    })
  });
};

export const FETCH_USER = 'FETCH_USER';
export const fetchUser = customerAccessToken => dispatch => {
  return dispatch({
    type: FETCH_USER,
    payload: Apollo.query({
      query: customerFetch,
      variables: { customerAccessToken }
    })
  });
};
