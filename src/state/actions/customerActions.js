import { client as Apollo } from 'lib/Apollo';
import {
  customerCreate,
  customerAccessTokenCreate,
  customerFetch,
  customerUpdate
} from 'state/graphql/customer';
import {
  cancelEditCustomerFields,
  alertCustomerEditSuccess
} from 'state/actions/ui/customerUIActions';
import { checkoutCustomerAssociate } from 'state/actions/checkoutActions';

import get from 'utils/get';

export const SIGN_UP_CUSTOMER = 'SIGN_UP_CUSTOMER';
export const signUpCustomer = input => dispatch => {
  return dispatch({
    type: SIGN_UP_CUSTOMER,
    payload: Apollo.mutate({
      mutation: customerCreate,
      variables: { input }
    })
  });
};

export const SIGN_IN_CUSTOMER = 'SIGN_IN_CUSTOMER';
export const signInCustomer = (input, checkoutId) => dispatch => {
  return dispatch({
    type: SIGN_IN_CUSTOMER,
    payload: new Promise(resolve => {
      return Apollo.mutate({
        mutation: customerAccessTokenCreate,
        variables: { input }
      }).then(customerAccessToken => {
        if (
          get(
            customerAccessToken,
            'data.customerAccessTokenCreate.userErrors',
            []
          ).length
        )
          throw get(
            customerAccessToken,
            'data.customerAccessTokenCreate.userErrors[0].message',
            ''
          );

        const accessToken = get(
          customerAccessToken,
          'data.customerAccessTokenCreate.customerAccessToken.accessToken',
          ''
        );

        return dispatch(
          checkoutCustomerAssociate(checkoutId, accessToken)
        ).then(() => {
          return dispatch(fetchCustomer(accessToken)).then(() =>
            resolve(accessToken)
          );
        });
      });
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
      variables: { customerAccessToken },
      fetchPolicy: 'no-cache'
    })
  });
};

export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';
export const updateCustomer = (customerAccessToken, customer) => dispatch => {
  return dispatch({
    type: UPDATE_CUSTOMER,
    payload: new Promise((resolve, reject) => {
      return Apollo.mutate({
        mutation: customerUpdate,
        variables: { customerAccessToken, customer }
      }).then(res => {
        if (get(res, 'data.customerUpdate.userErrors', []).length) {
          return reject(
            get(res, 'data.customerUpdate.userErrors[0].message', '')
          );
        }

        const newAccessToken = get(
          res,
          'data.customerUpdate.customerAccessToken.accessToken'
        )
          ? get(res, 'data.customerUpdate.customerAccessToken.accessToken')
          : customerAccessToken;

        dispatch(alertCustomerEditSuccess(customer));
        dispatch(cancelEditCustomerFields());
        dispatch(fetchCustomer(newAccessToken)).then(() =>
          resolve(newAccessToken)
        );
      });
    })
  });
};
