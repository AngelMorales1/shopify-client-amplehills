const gtag = () => {
  if (window.gtag) return window.gtag;

  return () => {};
};

export default gtag;

export const reportConversion = send_to => {
  function gtagReportConversion(url) {
    var event_callback = function() {
      if (typeof url !== 'undefined') {
        window.location = url;
      }
    };

    gtag('event', 'conversion', {
      send_to,
      event_callback
    });

    return false;
  }

  gtagReportConversion();
};
