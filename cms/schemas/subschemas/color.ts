const COLORS = [
  {
    value: 'blue',
    title: 'Blue',
  },
  {
    value: 'peach',
    title: 'Peach',
  },
  {
    value: 'purple',
    title: 'Purple',
  },
  {
    value: 'pink',
    title: 'Pink',
  },
  {
    value: 'light-pink',
    title: 'Light Pink',
  },
  {
    value: 'yellow',
    title: 'Yellow',
  },
  {
    value: 'light-yellow',
    title: 'Light Yellow',
  },
  {
    value: 'light-turquoise',
    title: 'Light Turquoise',
  },
  {
    value: 'light-orange',
    title: 'Light Orange',
  },
  {
    value: 'yellow-green',
    title: 'Yellow Green',
  },
  {
    value: 'light-yellow-green',
    title: 'Light Yellow Green',
  }
];

export default options => {
  const list = !!options.limit && options.limit.length
    ? COLORS.filter(color => options.limit.includes(color.value))
    : COLORS;
  const sanitizedOptions = Object.keys(options).reduce((object, key) => {
    if (key !== 'limit') object[key] = options[key];
    return object;
  }, {});

  return {
    type: 'string',
    options: { list },
    ...sanitizedOptions
  };
}
