import gql from 'graphql-tag';

export const fetchArticlesQuery = gql`
  query articles {
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

export const fetchArticlesTagsQuery = gql`
  query articlesTags {
    articles(first: 100, reverse: true) {
      edges {
        node {
          tags
        }
      }
    }
  }
`;

export const fetchArticlesByTagQuery = gql`
  query articlesByTag($tag: String!) {
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
