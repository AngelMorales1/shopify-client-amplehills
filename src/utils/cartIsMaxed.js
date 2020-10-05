export const MAXIMUM_NUMBER_OF_PACKS = 2;

// Expecting shape from state/selectors/lineItem
export const cartIsMaxed = lineItems => {
  const uniquePacks = lineItems.reduce((numberOfPacks, lineItem) => {
    const attrs = lineItem.attributes;

    if (!attrs) return numberOfPacks;
    const pack = attrs.find(attr => attr.key === '__CYOS_PACK_ID__');

    if (!pack) return numberOfPacks;
    const value = pack.value;

    if (!value) return numberOfPacks;

    return numberOfPacks.concat([value]);
  }, []);

  return uniquePacks.length >= MAXIMUM_NUMBER_OF_PACKS;
};

export default cartIsMaxed;
