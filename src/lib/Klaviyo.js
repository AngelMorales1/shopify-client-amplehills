const AMPLE_HILLS_API_ENDPOINT =
  'https://us-central1-ample-hills-api.cloudfunctions.net';

const Klaviyo = {
  signup(email) {
    return window
      .fetch(`${AMPLE_HILLS_API_ENDPOINT}/klaviyo`, {
        method: 'post',
        body: JSON.stringify({ email })
      })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      });
  }
};

export default Klaviyo;
