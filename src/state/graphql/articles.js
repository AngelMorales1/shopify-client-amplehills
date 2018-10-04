import gql from 'graphql-tag';

export const fetchAllNewsArticlesQuery = gql`
  query allNewsArticles {
    blogs(first: 250, query: news) {
      edges {
        node {
          articles(first: 250) {
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

export const fetchArticlesQuery = gql`
  query articles($cursor: String, $tag: String) {
    articles(after: $cursor, first: 5, reverse: true, query: $tag) {
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

export const fetchCursorQuery = gql`
  query articlesCursor($cursor: String) {
    articles(after: $cursor, first: 5, reverse: true) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
      }
    }
  }
`;
