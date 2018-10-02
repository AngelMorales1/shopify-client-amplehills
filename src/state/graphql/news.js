import gql from 'graphql-tag';

export const newsFetch = gql`
  query newsArticles {
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
`;

export const newsTagFetch = gql`
  query newsTags {
    articles(first: 100, reverse: true) {
      edges {
        node {
          tags
        }
      }
    }
  }
`;

export const newsByTagFetch = gql`
  query newsArticles($tag: String!) {
    articles(first: 5, reverse: true, query: $tag) {
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
