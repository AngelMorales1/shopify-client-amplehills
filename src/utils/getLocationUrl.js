export default locationTitle => {
  const locationUrl = locationTitle.split(' ');

  if (!locationUrl[locationUrl.length - 1]) {
    locationUrl.pop();
  }

  return locationUrl.join('-');
};
