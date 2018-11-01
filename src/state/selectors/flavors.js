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
      const cardBlock1Text = get(fields, 'cardBlock1Text', '');
      const cardBlock1Link = get(fields, 'cardBlock1Link', '');
      const cardBlock1Color = get(fields, 'cardBlock1Color', '');
      const cardBlock1Image = get(fields, 'cardBlock1Image', {});
      const cardBlock2Text = get(fields, 'cardBlock2Text', '');
      const cardBlock2Link = get(fields, 'cardBlock2Link', '');
      const cardBlock2Color = get(fields, 'cardBlock2Color', '');
      const cardBlock2Image = get(fields, 'cardBlock2Image', {});
      const contentBlocks = get(fields, 'contentBlocks', []);
      const availableLocations = get(fields, 'availableLocations', []);
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
        contentBlocks,
        availableLocations,
        cardBlock1Text,
        cardBlock1Link,
        cardBlock1Color,
        cardBlock1Image,
        cardBlock2Text,
        cardBlock2Link,
        cardBlock2Color,
        cardBlock2Image
      };
    });

    return {
      flavors: sanitisedFlavors,
      collectedFilters,
      collectedDietaryRestrictions
    };
  }
);
