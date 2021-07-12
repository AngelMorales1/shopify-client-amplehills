import { createSelector } from 'reselect';
import uniq from 'lodash/uniq';
import get from 'utils/get';

export default createSelector(
  state => get(state, 'flavors.flavors', []),
  flavors => {
    let collectedFilters = [];
    let collectedDietaryRestrictions = [];
    const sanitizedFlavors =
      !!flavors.map &&
      flavors.map(flavor => {
        const id = get(flavor, '_id', '');
        const title = get(flavor, 'name', '');
        const slug = get(flavor, 'slug', '');
        const showOnFlavorsPage = get(flavor, 'showOnFlavorsPage', false);
        const label = get(flavor, 'label', '');
        const labelColor = get(flavor, 'labelColor', 'red');
        const image = get(flavor, 'image.src', '');
        const blocks = get(flavor, 'blocks', []);
        const availableLocations = get(flavor, 'availableLocations', []);
        const filters = get(flavor, 'filters', []);
        const dietaryRestrictions = get(flavor, 'dietaryRestrictions', []);

        collectedFilters = [...collectedFilters, ...filters];
        collectedDietaryRestrictions = [
          ...collectedDietaryRestrictions,
          ...dietaryRestrictions
        ];

        const order = get(flavor, 'order', 0);
        const seoTitle = get(flavor, 'seoTitle', '');
        const seoDescription = get(flavor, 'seoDescription', '');
        const seoImage = get(flavor, 'seoImage.fields.file.url', '');

        return {
          id,
          title,
          label,
          labelColor,
          showOnFlavorsPage,
          image,
          filters,
          dietaryRestrictions,
          slug,
          blocks,
          availableLocations,
          order,
          seoTitle,
          seoDescription,
          seoImage
        };
      });

    return {
      flavors: sanitizedFlavors,
      collectedFilters: uniq(collectedFilters),
      collectedDietaryRestrictions: uniq(collectedDietaryRestrictions)
    };
  }
);
