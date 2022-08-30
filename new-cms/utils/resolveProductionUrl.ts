const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://www.amplehills.com/'
    : 'http://localhost:3000/';
const SEARCH_PARAM = '?preview=';

export default function resolveProductionUrl(document) {
  switch (document._type) {
    case 'flavorFrenzy':
      return `${BASE_URL}${document.slug}${SEARCH_PARAM}${document._id}`
    case 'page':
      return `${BASE_URL}${document.slug}`
    default:
      console.log("ERROR IN THE CONTENT TYPE",document)
      break;
  }
  
  
};
