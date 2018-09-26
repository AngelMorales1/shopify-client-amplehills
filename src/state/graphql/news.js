import gql from 'graphql-tag';

export const newsFetch = gql`
  query shop {
    shop {
      blogs(first: 100) {
        edges {
          node {
            handle
            title
            id
            articles(first: 10, reverse: true) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  content
                  contentHtml
                  handle
                  id
                  publishedAt
                  tags
                  title
                  image {
                    altText
                    id
                    originalSrc
                  }
                  author {
                    name
                    email
                  }
                }
                cursor
              }
            }
          }
        }
      }
    }
  }
`;
