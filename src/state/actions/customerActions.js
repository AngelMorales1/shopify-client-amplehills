import { client as Apollo } from 'lib/Apollo';
import {
  customerAccessTokenCreate,
  customerFetch
} from 'state/graphql/customer';
import get from 'utils/get';

export const SIGN_IN_CUSTOMER = 'SIGN_IN_CUSTOMER';
export const signInCustomer = payload => dispatch => {
  return dispatch({
    type: SIGN_IN_CUSTOMER,
    payload: Apollo.mutate({
      mutation: customerAccessTokenCreate,
      variables: { input: payload }
    }).then(customerAccessToken => {
      const accessToken = get(
        customerAccessToken,
        'data.customerAccessTokenCreate.customerAccessToken.accessToken',
        ''
      );

      return dispatch(fetchCustomer(accessToken));
    })
  });
};

export const FETCH_CUSTOMER = 'FETCH_CUSTOMER';
export const fetchCustomer = customerAccessToken => dispatch => {
  return dispatch({
    type: FETCH_CUSTOMER,
    payload: Apollo.query({
      query: customerFetch,
      variables: { customerAccessToken }
    })
  });
};
