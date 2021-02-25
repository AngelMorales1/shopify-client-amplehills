const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://staging.amplehills.com/'
    : 'http://localhost:3000/';
const SEARCH_PARAM = '?preview=';

export default function resolveProductionUrl(document) {
  if (document._type === 'flavorFrenzy') {
    return `${BASE_URL}${document.slug}${SEARCH_PARAM}${document._id}`
  }
};
