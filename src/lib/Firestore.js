import environmentIsLocal from 'utils/environmentIsLocal';
// import { FlavorFrenzyVote } from 'types';

const API_VERSION = 'api/v1';
const BASE_URL = environmentIsLocal()
  ? 'http://localhost:5000'
  : 'https://ample-hills-api.web.app';

const Endpoints = {
  HappyFox: {
    CREATE_TICKET: `${BASE_URL}/${API_VERSION}/happy_fox/tickets/create`
  },
  FlavorFrenzy: {
    GET_VOTES: `${BASE_URL}/${API_VERSION}/flavor_frenzy/votes`,
    CREATE_VOTE: `${BASE_URL}/${API_VERSION}/flavor_frenzy/votes/create`
  }
};

const Firestore = {
  HappyFox: {
    createTicket: function(ticket) {
      return fetch(Endpoints.HappyFox.CREATE_TICKET, {
        method: 'post',
        body: JSON.stringify(ticket)
      });
    }
  },
  FlavorFrenzy: {
    createVote: function(vote) {
      return fetch(Endpoints.FlavorFrenzy.CREATE_VOTE, {
        method: 'post',
        body: JSON.stringify({ ...vote })
      });
    },
    getVotes: function(id) {
      return fetch(`${Endpoints.FlavorFrenzy.GET_VOTES}?id=${id}`).then(res =>
        res.json()
      );
    }
  }
};

export default Firestore;
