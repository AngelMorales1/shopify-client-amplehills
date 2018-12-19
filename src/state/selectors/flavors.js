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
      const labelColor = get(fields, 'labelColor', '');
      const image = get(fields, 'image.fields.file.url', '');
      const contentBlocks = get(fields, 'contentBlocks', []);
      const availableLocations = get(fields, 'availableLocations', []);
      const filters = get(fields, 'filters.fragments', []).reduce(
        (sanitisedFilters, fragment) => {
          const filterName = get(fragment[1], 'value', '');

          if (filterName) {
            sanitisedFilters[filterName] = filterName;
            if (!collectedFilters.includes(filterName)) {
              collectedFilters.push(filterName);
            }
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
          sanitisedDietaryRestrictions[restrictionName] = true;

          if (!collectedDietaryRestrictions.includes(restrictionName)) {
            collectedDietaryRestrictions.push(restrictionName);
          }
        }

        return sanitisedDietaryRestrictions;
      }, {});
      const order = get(fields, 'order', 0);

      return {
        id,
        title,
        label,
        labelColor,
        image,
        filters,
        dietaryRestrictions,
        slug,
        contentBlocks,
        availableLocations,
        order
      };
    });

    return {
      flavors: sanitisedFlavors,
      collectedFilters,
      collectedDietaryRestrictions
    };
  }
);
