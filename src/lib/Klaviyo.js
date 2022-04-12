import environmentIsLocal from 'utils/environmentIsLocal';

const BASE_URL = environmentIsLocal()
  ? 'http://localhost:5050'
  : 'https://ample-hills-api.web.app';

const Klaviyo = {
  signup(email) {
    return window
      .fetch(`${BASE_URL}/klaviyo`, {
        method: 'post',
        body: JSON.stringify({ email })
      })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      });
  },
  signupV1(email, list, body = {}) {
    return window
      .fetch(`${BASE_URL}/api/v1/klaviyo`, {
        method: 'post',
        body: JSON.stringify({ email, list, body })
      })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      });
  },
  flavorFrenzyPrediction(email, prediction) {
    return window
      .fetch(`${BASE_URL}/api/v1/flavor_frenzy/predictions/create`, {
        method: 'post',
        body: JSON.stringify({ email, prediction })
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
