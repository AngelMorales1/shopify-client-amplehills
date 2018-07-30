import BuySDK from 'lib/Buy';
import { client as Apollo } from 'lib/Apollo';

import {
  customerAssociate,
  customerDisassociate,
  checkoutAttributesUpdate,
  checkoutFetch,
  checkoutCreate,
  checkoutLineItemsAdd,
  checkoutLineItemsRemove
} from 'state/graphql/checkout';
import { openMiniCart } from 'state/actions/ui/miniCartUIActions';
import get from 'utils/get';

export const FETCH_OR_CREATE_CHECKOUT = 'FETCH_OR_CREATE_CHECKOUT';
export const fetchOrCreateCheckout = checkoutId => dispatch => {
  return dispatch({
    type: FETCH_OR_CREATE_CHECKOUT,
    payload: new Promise(resolve => {
      if (!checkoutId)
        return dispatch(createCheckout()).then(checkout => resolve(checkout));

      return dispatch(fetchCheckout(checkoutId)).then(checkout =>
        resolve(checkout)
      );
    })
  });
};

export const FETCH_CHECKOUT = 'FETCH_CHECKOUT';
export const fetchCheckout = checkoutId => dispatch => {
  return dispatch({
    type: FETCH_CHECKOUT,
    payload: new Promise((resolve, reject) => {
      return Apollo.query({
        query: checkoutFetch,
        variables: { id: checkoutId }
      })
        .then(res => {
          if (get(res, 'data.node.completedAt', false))
            return dispatch(createCheckout()).then(checkout =>
              resolve(checkout)
            );

          resolve(get(res, 'data.node', {}));
        })
        .catch(error => {
          return reject(error);
        });
    })
  });
};

export const CREATE_CHECKOUT = 'CREATE_CHECKOUT';
export const createCheckout = () => dispatch => {
  return dispatch({
    type: CREATE_CHECKOUT,
    payload: new Promise(resolve => {
      return Apollo.mutate({
        mutation: checkoutCreate,
        variables: { input: {} }
      }).then(checkout =>
        resolve(get(checkout, 'data.checkoutCreate.checkout', {}))
      );
    })
  });
};

export const ADD_LINE_ITEMS = 'ADD_LINE_ITEMS';
export const addLineItems = (checkoutId, lineItems) => dispatch => {
  return dispatch({
    type: ADD_LINE_ITEMS,
    payload: new Promise((resolve, reject) => {
      return Apollo.mutate({
        mutation: checkoutLineItemsAdd,
        variables: { lineItems, checkoutId }
      }).then(res => {
        if (get(res, 'data.checkoutLineItemsAdd.userErrors', []).length) {
          return reject(
            get(res, 'data.checkoutLineItemsAdd.userErrors[0].message', '')
          );
        }

        return resolve(get(res, 'data.checkoutLineItemsAdd.checkout', {}));
      });
    })
  }).then(() => dispatch(openMiniCart()));
};

export const REMOVE_LINE_ITEMS = 'REMOVE_LINE_ITEMS';
export const removeLineItems = itemId => {
  return {
    type: REMOVE_LINE_ITEMS,
    payload: itemId
  };
};

export const CANCEL_REMOVE_LINE_ITEMS = 'CANCEL_REMOVE_LINE_ITEMS';
export const cancelRemoveLineItems = itemId => {
  return {
    type: CANCEL_REMOVE_LINE_ITEMS,
    payload: itemId
  };
};

export const CONFIRM_REMOVE_LINE_ITEMS = 'CONFIRM_REMOVE_LINE_ITEMS';
export const confirmRemoveLineItems = (checkoutId, lineItemIds) => dispatch => {
  return dispatch({
    type: CONFIRM_REMOVE_LINE_ITEMS,
    payload: new Promise((resolve, reject) => {
      return Apollo.mutate({
        mutation: checkoutLineItemsRemove,
        variables: { checkoutId, lineItemIds }
      }).then(res => {
        if (get(res, 'data.checkoutLineItemsRemove.userErrors', []).length) {
          return reject(
            get(res, 'data.checkoutLineItemsRemove.userErrors[0].message', '')
          );
        }

        lineItemIds.map(id => dispatch(cancelRemoveLineItems(id)));
        return resolve(get(res, 'data.checkoutLineItemsRemove.checkout', {}));
      });
    })
  });
};

export const UPDATE_LINE_ITEMS = 'UPDATE_LINE_ITEMS';
export const updateLineItems = (checkoutId, items) => dispatch => {
  return dispatch({
    type: UPDATE_LINE_ITEMS,
    meta: { id: get(items, '[0].id', '') },
    payload: BuySDK.checkout.updateLineItems(checkoutId, items)
  });
};

export const UPDATE_NOTE = 'UPDATE_NOTE';
export const updateNote = (checkoutId, input) => dispatch => {
  return dispatch({
    type: UPDATE_NOTE,
    payload: new Promise((resolve, reject) =>
      Apollo.mutate({
        mutation: checkoutAttributesUpdate,
        variables: { checkoutId, input }
      }).then(res => {
        if (get(res, 'data.checkoutAttributesUpdate.userErrors', []).length) {
          return reject(
            get(res, 'data.checkoutAttributesUpdate.userErrors[0].message', '')
          );
        }

        return resolve(
          get(res, 'data.checkoutAttributesUpdate.checkout', { note: '' })
        );
      })
    )
  });
};

export const CHECKOUT_CUSTOMER_ASSOCIATE = 'CHECKOUT_CUSTOMER_ASSOCIATE';
export const checkoutCustomerAssociate = (
  checkoutId,
  customerAccessToken
) => dispatch => {
  return dispatch({
    type: CHECKOUT_CUSTOMER_ASSOCIATE,
    payload: Apollo.mutate({
      mutation: customerAssociate,
      variables: { checkoutId, customerAccessToken }
    })
  });
};

export const CHECKOUT_CUSTOMER_DISASSOCIATE = 'CHECKOUT_CUSTOMER_DISASSOCIATE';
export const checkoutCustomerDisassociate = checkoutId => dispatch => {
  return dispatch({
    type: CHECKOUT_CUSTOMER_DISASSOCIATE,
    payload: Apollo.mutate({
      mutation: customerDisassociate,
      variables: { checkoutId }
    })
  });
};
