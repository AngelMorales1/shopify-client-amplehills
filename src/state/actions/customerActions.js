import { client as Apollo } from 'lib/Apollo';
import {
  customerCreate,
  customerAccessTokenCreate,
  customerFetch
} from 'state/graphql/customer';
import { checkoutCustomerAssociate } from 'state/actions/checkoutActions';

import get from 'utils/get';

export const SIGN_UP_CUSTOMER = 'SIGN_UP_CUSTOMER';
export const signUpCustomer = input => dispatch => {
  return dispatch({
    type: SIGN_UP_CUSTOMER,
    payload: Apollo.mutate({
      mutation: customerCreate,
      variables: { input }
    }).then(customer => {
      console.log(customer);
    })
  });
};

export const SIGN_IN_CUSTOMER = 'SIGN_IN_CUSTOMER';
export const signInCustomer = (input, checkoutId) => dispatch => {
  return dispatch({
    type: SIGN_IN_CUSTOMER,
    payload: Apollo.mutate({
      mutation: customerAccessTokenCreate,
      variables: { input }
    }).then(customerAccessToken => {
      const accessToken = get(
        customerAccessToken,
        'data.customerAccessTokenCreate.customerAccessToken.accessToken',
        ''
      );

      return dispatch(checkoutCustomerAssociate(checkoutId, accessToken)).then(
        () => {
          return dispatch(fetchCustomer(accessToken));
        }
      );
    })
  });
};

export const SIGN_OUT_CUSTOMER = 'SIGN_OUT_CUSTOMER';
export const signOutCustomer = () => {
  return {
    type: SIGN_OUT_CUSTOMER
  };
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
