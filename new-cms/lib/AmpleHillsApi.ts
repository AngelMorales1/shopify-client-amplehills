const BASE_URL = window.location.href.includes('localhost')
  ? 'http://localhost:5000'
  : 'https://ample-hills-api.web.app';
const VERSION = 'v1';

export const AmpleHillsApi = {
  fetchEventAttendees: function(name, variants): Promise<any> {
    return fetch(`${BASE_URL}/api/${VERSION}/events/attendees`, {
      method: 'POST',
      body: JSON.stringify({ name, variants, callerId: '2ec6b100-7e60-46f1-821d-2c39e2c1935d' })
    })
  }
};

export default AmpleHillsApi;