import gql from 'graphql-tag';

export const customerAccessTokenCreate = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      userErrors {
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`;

export const customerFetch = gql`
  query customer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      email
      firstName
      lastName
      phone
      addresses(first: 5) {
        edges {
          node {
            address1
            address2
            city
            company
            country
            countryCodeV2
            firstName
            lastName
            province
            zip
          }
        }
      }
      orders(first: 5, reverse: true) {
        edges {
          node {
            orderNumber
            totalPrice
          }
        }
      }
    }
  }
`;
