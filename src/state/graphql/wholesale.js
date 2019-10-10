import gql from 'graphql-tag';

export const fetchWholesaleProducts = gql`
  query WholesaleProducts {
    shop {
      products(first: 250, query: "tag:wholesale") {
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
