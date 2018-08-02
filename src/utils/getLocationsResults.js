export default locationsLength => {
  const locationsText = locationsLength === 1 ? 'Location' : 'Locations';
  return `${locationsLength} ${locationsText}`;
};
