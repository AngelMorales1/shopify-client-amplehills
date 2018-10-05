import gql from 'graphql-tag';

export const fetchAllNewsArticlesQuery = gql`
  query allNewsArticles($cursor: String) {
    blogs(first: 1, query: news) {
      edges {
        node {
          articles(reverse: true, first: 250, after: $cursor) {
            edges {
              cursor
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
            }
            pageInfo {
              hasNextPage
            }
          }
        }
      }
    }
  }
`;
