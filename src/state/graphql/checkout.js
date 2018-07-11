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
