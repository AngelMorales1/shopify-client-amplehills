export default fragments => {
  return Object.values(fragments).reduce((fragmentsArray, fragment) => {
    fragmentsArray.push(fragment);
    return fragmentsArray;
  }, []);
};
