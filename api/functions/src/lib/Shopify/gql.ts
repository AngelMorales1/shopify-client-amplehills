import { gql } from 'graphql-request';

const Gql = {
  products: gql`{
    products(first:250, query: "product_type:Events OR product_type:Classes") {
      edges {
        node {
          id
          title
          productType
        }
      }
    }
  }`,
  order: (id: string) => gql`{
    node(id: "gid://shopify/Order/${id}") {
      id
      ... on Order {
        id
      }
    }
  }`
};

export default Gql;