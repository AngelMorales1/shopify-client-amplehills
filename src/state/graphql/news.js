import gql from 'graphql-tag';

export const newsFetch = gql`
  query newsArticles {
    blogs(first: 5) {
      edges {
        node {
          handle
          title
          id
          articles(first: 5, reverse: true) {
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
`;
