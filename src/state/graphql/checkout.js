import gql from 'graphql-tag';

export const customerAssociate = gql`
  mutation checkoutCustomerAssociate(
    $checkoutId: ID!
    $customerAccessToken: String!
  ) {
    checkoutCustomerAssociate(
      checkoutId: $checkoutId
      customerAccessToken: $customerAccessToken
    ) {
      userErrors {
        field
        message
      }
      checkout {
        id
      }
    }
  }
`;

export const customerDisassociate = gql`
  mutation checkoutCustomerDisassociate($checkoutId: ID!) {
    checkoutCustomerDisassociate(checkoutId: $checkoutId) {
      userErrors {
        field
        message
      }
      checkout {
        id
      }
    }
  }
`;

export const checkoutAttributesUpdate = gql`
  mutation checkoutAttributesUpdate(
    $checkoutId: ID!
    $input: CheckoutAttributesUpdateInput!
  ) {
    checkoutAttributesUpdate(checkoutId: $checkoutId, input: $input) {
      userErrors {
        field
        message
      }
      checkout {
        note
      }
    }
  }
`;
