export default param => {
  const searchParams = new URL(window.location.href).searchParams;

  if (!!searchParams) {
    return searchParams.get(param);
  } else {
    return '';
  }
};
