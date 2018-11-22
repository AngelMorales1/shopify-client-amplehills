import QueryString from 'query-string';

const Bookings = {
  getAvailability(project_id) {
    const query = QueryString.stringify({ project_id, to: '180 days' });
    return window
      .fetch(`https://ample-hills-api-7337le328.now.sh/availability?${query}`)
      .then(resp => resp.json());
  }
};

export default Bookings;
