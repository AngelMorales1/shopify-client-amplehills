import gql from 'graphql-tag';

export const fetchProducts = gql`
  query shop {
    shop {
      products(first: 250) {
        edges {
          node {
            availableForSale
            handle
            id
            productType
            tags
            title
            vendor
            images(first: 10) {
              edges {
                node {
                  altText
                  id
                  originalSrc
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  compareAtPrice
                  availableForSale
                  image {
                    id
                    altText
                    originalSrc
                  }
                  price
                  product {
                    id
                    handle
                  }
                  title
                }
              }
            }
          }
        }
      }
    }
  }
`;
