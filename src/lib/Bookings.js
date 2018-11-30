import QueryString from 'qs';

const AMPLE_HILLS_API_ENDPOINT = 'https://ample-hills-api-g5qlhkswu.now.sh';

const Bookings = {
  getAvailability(project_id) {
    const query = QueryString.stringify({ project_id, to: '180 days' });
    return window
      .fetch(`${AMPLE_HILLS_API_ENDPOINT}/availability?${query}`)
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      });
  },

  makeBooking(stringifiedTimekitRequestObject, customerName, customerEmail) {
    return window
      .fetch(`${AMPLE_HILLS_API_ENDPOINT}/bookings`, {
        method: 'post',
        body: JSON.stringify({
          customer: { name: customerName, email: customerEmail },
          ...JSON.parse(stringifiedTimekitRequestObject)
        })
      })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      });
  }
};

export default Bookings;
