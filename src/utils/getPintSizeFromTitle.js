import PintSizes from 'constants/PintSizes';

export default title => {
  const pint = Object.entries(PintSizes).find(size => size[1].name === title);
  const size = pint[1].size;

  return size;
};
