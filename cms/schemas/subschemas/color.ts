const COLORS = [
  {
    value: 'pink',
    title: 'Pink',
  },
  {
    value: 'blue',
    title: 'Blue',
  },
  {
    value: 'peach',
    title: 'Peach',
  },
  {
    value: 'yellow',
    title: 'Yellow',
  },
  {
    value: 'light-pink',
    title: 'Light Pink',
  },
  {
    value: 'light-yellow',
    title: 'Light Yellow',
  },
  {
    value: 'light-peach',
    title: 'Peach',
  },
  {
    value: 'mustard',
    title: 'Mustard',
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
    value: 'peach-pink',
    title: 'Peach Pink',
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
