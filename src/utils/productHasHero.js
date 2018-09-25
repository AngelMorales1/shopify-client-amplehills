import get from 'utils/get';

export const productsWithoutHero = ['choose-your-own-story'];

export default product => {
  const handle = get(product, 'handle', '');
  return !productsWithoutHero.includes(handle);
};
