import get from 'utils/get';
import * as Sentry from '@sentry/browser';

export default (pintHandles, shopifyProducts) => {
  const data = pintHandles.reduce((acc, handle) => {
    const product = get(shopifyProducts, handle, null);

    if (!product) {
      Sentry.captureMessage(
        `makeStringifiedInventoryRequestObject: There is no Shopify product with handle "${handle}", please correct this in Contentful.`,
        {
          level: 'warning'
        }
      );
      return acc;
    }
    const variant = (product.variants || [])[0];
    if (!variant) return acc;

    const splat = atob(variant.id).split('/');
    const variant_id = parseInt(splat[splat.length - 1], 10);

    const existing = acc.find(
      adjustment => adjustment.variant_id === variant_id
    );
    if (existing) {
      existing.adjustment = existing.adjustment - 1;
      return acc;
    } else {
      return [
        ...acc,
        {
          variant_id,
          adjustment: -1
        }
      ];
    }
  }, []);

  return JSON.stringify({ data });
};
