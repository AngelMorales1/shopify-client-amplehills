import gql from 'graphql-tag';

export const newsFetch = gql`
  query newsArticles($cursor: String) {
    articles(after: $cursor, first: 5, sortKey: PUBLISHED_AT, reverse: true) {
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
`;

export const cursorFetch = gql`
  query newsArticles($cursor: String) {
    articles(after: $cursor, first: 5, sortKey: PUBLISHED_AT, reverse: true) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
      }
    }
  }
`;
