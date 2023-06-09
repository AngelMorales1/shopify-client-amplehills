import gql from 'graphql-tag';

export const checkoutFetch = gql`
  query checkoutFetch($id: ID!) {
    node(id: $id) {
      ... on Checkout {
        id
        completedAt
        currencyCode
        note
        subtotalPrice
        totalPrice
        webUrl
        lineItems(first: 250) {
          edges {
            node {
              customAttributes {
                key
                value
              }
              id
              quantity
              title
              variant {
                id
                compareAtPrice
                availableForSale
                title
                price
                image {
                  id
                  altText
                  originalSrc
                }
                product {
                  id
                  handle
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const checkoutCreate = gql`
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      userErrors {
        field
        message
      }
      checkout {
        id
        completedAt
        currencyCode
        note
        subtotalPrice
        totalPrice
        webUrl
        lineItems(first: 250) {
          edges {
            node {
              customAttributes {
                key
                value
              }
              id
              quantity
              title
              variant {
                id
                compareAtPrice
                availableForSale
                title
                price
                image {
                  id
                  altText
                  originalSrc
                }
                product {
                  id
                  handle
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const checkoutLineItemsAdd = gql`
  mutation checkoutLineItemsAdd(
    $lineItems: [CheckoutLineItemInput!]!
    $checkoutId: ID!
  ) {
    checkoutLineItemsAdd(lineItems: $lineItems, checkoutId: $checkoutId) {
      userErrors {
        field
        message
      }
      checkout {
        id
        completedAt
        currencyCode
        note
        subtotalPrice
        totalPrice
        webUrl
        lineItems(first: 250) {
          edges {
            node {
              customAttributes {
                key
                value
              }
              id
              quantity
              title
              variant {
                id
                compareAtPrice
                availableForSale
                title
                price
                image {
                  id
                  altText
                  originalSrc
                }
                product {
                  id
                  handle
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const checkoutLineItemsRemove = gql`
  mutation checkoutLineItemsRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
    checkoutLineItemsRemove(
      checkoutId: $checkoutId
      lineItemIds: $lineItemIds
    ) {
      userErrors {
        field
        message
      }
      checkout {
        id
        completedAt
        currencyCode
        note
        subtotalPrice
        totalPrice
        webUrl
        lineItems(first: 250) {
          edges {
            node {
              customAttributes {
                key
                value
              }
              id
              quantity
              title
              variant {
                id
                compareAtPrice
                availableForSale
                title
                price
                image {
                  id
                  altText
                  originalSrc
                }
                product {
                  id
                  handle
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const checkoutLineItemsUpdate = gql`
  mutation checkoutLineItemsUpdate(
    $checkoutId: ID!
    $lineItems: [CheckoutLineItemUpdateInput!]!
  ) {
    checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
      userErrors {
        field
        message
      }
      checkout {
        id
        completedAt
        currencyCode
        note
        subtotalPrice
        totalPrice
        webUrl
        lineItems(first: 250) {
          edges {
            node {
              customAttributes {
                key
                value
              }
              id
              quantity
              title
              variant {
                id
                compareAtPrice
                availableForSale
                title
                price
                image {
                  id
                  altText
                  originalSrc
                }
                product {
                  id
                  handle
                }
              }
            }
          }
        }
      }
    }
  }
`;

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
