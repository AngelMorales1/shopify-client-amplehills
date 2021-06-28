const COLORS = [
  {
    value: 'pink',
    label: 'Pink',
  },
  {
    value: 'blue',
    label: 'Blue',
  },
  {
    value: 'peach',
    label: 'Peach',
  },
  {
    value: 'yellow',
    label: 'Yellow',
  },
  {
    value: 'light-pink',
    label: 'Light Pink',
  },
  {
    value: 'light-yellow',
    label: 'Light Yellow',
  },
  {
    value: 'light-peach',
    label: 'Peach',
  },
  {
    value: 'mustard',
    label: 'Mustard',
  },
  {
    value: 'light-turquoise',
    label: 'Light Turquoise',
  },
  {
    value: 'light-orange',
    label: 'Light Orange',
  },
  {
    value: 'peach-pink',
    label: 'Peach Pink',
  },
  {
    value: 'yellow-green',
    label: 'Yellow Green',
  },
  {
    value: 'light-yellow-green',
    label: 'Light Yellow Green',
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
