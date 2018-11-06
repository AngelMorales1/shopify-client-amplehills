import { createSelector } from 'reselect';
import get from 'utils/get';
import products from 'state/selectors/products';

export default createSelector(
  state => products(state),
  products => {
    const product = get(products, 'cake-deposit', {});

    return {
      ...product,
      link: '/cake-request-form'
    };
  }
);
