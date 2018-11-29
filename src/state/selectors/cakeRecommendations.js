import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state =>
    get(
      state,
      'applicationUI.globalSettings.items[0].fields.cakeRecommendations.simpleFragments',
      {}
    ),
  cakeRecommendations => {
    return Object.keys(cakeRecommendations).reduce((recommendations, id) => {
      const cakeRecommendation = cakeRecommendations[id];
      const title = get(cakeRecommendation, 'title', '');
      const flavor1 = get(cakeRecommendation, 'flavor1', '');
      const flavor2 = get(cakeRecommendation, 'flavor2', '');
      const base = get(cakeRecommendation, 'base', '');

      const recommendation = {
        id,
        title,
        flavor1,
        flavor2,
        base
      };

      recommendations.push(recommendation);

      return recommendations;
    }, []);
  }
);
