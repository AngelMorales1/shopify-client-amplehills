import { createSelector } from 'reselect';
import get from 'utils/get';

import slugify from 'utils/slugify';

export default createSelector(
  state => get(state, 'flavors.flavors'),
  flavors => {
    const collectedFilters = [];
    const collectedDietaryRestrictions = [];
    const sanitisedFlavors = get(flavors, 'items', []).map(flavor => {
      const id = get(flavor, 'sys.id', '');
      const fields = get(flavor, 'fields', {});
      const title = get(fields, 'title', '');
      const slug = slugify(title);
      const label = get(fields, 'label', '');
      const image = get(fields, 'image.fields.file.url', '');
      const contentBlocks = get(fields, 'contentBlocks', []);
      const filters = get(fields, 'filters.fragments', []).reduce(
        (sanitisedFilters, fragment) => {
          const filterName = get(fragment[1], 'value', '');

          if (filterName) {
            collectedFilters.push(filterName);
            sanitisedFilters[filterName] = filterName;
          }

          return sanitisedFilters;
        },
        {}
      );
      const dietaryRestrictions = get(
        fields,
        'dietaryRestrictions.fragments',
        []
      ).reduce((sanitisedDietaryRestrictions, fragment) => {
        const restrictionName = get(fragment[1], 'value', '');

        if (restrictionName) {
          collectedDietaryRestrictions.push(restrictionName);
          sanitisedDietaryRestrictions[restrictionName] = true;
        }

        return sanitisedDietaryRestrictions;
      }, {});

      return {
        id,
        title,
        label,
        image,
        filters,
        dietaryRestrictions,
        slug,
        contentBlocks
      };
    });

    return {
      flavors: sanitisedFlavors,
      collectedFilters,
      collectedDietaryRestrictions
    };
  }
);
