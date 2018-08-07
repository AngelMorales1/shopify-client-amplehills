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
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`;
