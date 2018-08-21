const defaults = {
  width: '1024',
  format: 'jpg&fl=progressive',
  quality: '90'
};

export default (url, width = defaults.width, format = defaults.format) =>
  `${url}?w=${width}&fm=${format}&q=90`;
