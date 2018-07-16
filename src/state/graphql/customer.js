import gql from 'graphql-tag';

export const customerCreate = gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      userErrors {
        field
        message
      }
      customer {
        id
      }
    }
  }
`;

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
      orders(first: 20) {
        edges {
          node {
            orderNumber
            id
            customerUrl
            totalPrice
            processedAt
            lineItems(first: 20) {
              edges {
                node {
                  title
                  quantity
                  customAttributes {
                    key
                    value
                  }
                  variant {
                    availableForSale
                    compareAtPrice
                    id
                    price
                    title
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const customerUpdate = gql`
  mutation customerUpdate(
    $customerAccessToken: String!
    $customer: CustomerUpdateInput!
  ) {
    customerUpdate(
      customerAccessToken: $customerAccessToken
      customer: $customer
    ) {
      userErrors {
        field
        message
      }
      customer {
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
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`;
