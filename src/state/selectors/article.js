import { createSelector } from 'reselect';
import get from 'utils/get';
import articlesByHandle from 'state/selectors/articlesByHandle';
export default createSelector(
  state => articlesByHandle(state),
  (state, props) => get(props, 'match.params.articleHandle', ''),
  (articlesByHandle, articleHandle) => get(articlesByHandle, articleHandle, {})
);
