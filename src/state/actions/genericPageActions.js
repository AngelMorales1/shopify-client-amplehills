import Data from 'lib/Data';
import Sanity from 'lib/Sanity';

export const GET_GENERIC_PAGE = 'GET_GENERIC_PAGE';
export const getGenericPage = (path, isFlavorFrenzy = false) => dispatch => {
  const query = {
    content_type: 'genericPage',
    'fields.slug': path,
    include: 4
  };

  if (!isFlavorFrenzy) query['fields.pageType[ne]'] = 'Flavor Frenzy';

  return dispatch({
    type: GET_GENERIC_PAGE,
    payload: Data.getEntries(query)
  });
};

export const GET_FLAVOR_FRENZY = 'GET_FLAVOR_FRENZY';
export const getFlavorFrenzy = slug => dispatch =>
  dispatch({
    type: GET_FLAVOR_FRENZY,
    payload: Sanity.fetchFlavorFrenzy(slug)
  });
