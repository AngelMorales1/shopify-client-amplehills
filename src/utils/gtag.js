const gtag = () => {
  if (window.gtag) return window.gtag;

  return () => {};
};

export default gtag;
