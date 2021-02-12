import environmentIsLocal from 'utils/environmentIsLocal';
import { FlavorFrenzyVote } from 'types';

const API_VERSION = '/api/v1';
const BASE_URL = environmentIsLocal()
  ? 'https://localhost:5000'
  : 'https://ample-hills.web.app';

const Endpoints = {
  FlavorFrenzy: {
    GET_VOTES: `${BASE_URL}/${API_VERSION}/flavor_frenzy/votes`,
    CREATE_VOTE: `${BASE_URL}/${API_VERSION}/flavor_frenzy/votes/create`
  }
};

const Firestore = {
  FlavorFrenzy: {
    createVote: function(vote: FlavorFrenzyVote) {
      return fetch(Endpoints.FlavorFrenzy.CREATE_VOTE, {
        body: JSON.stringify({ vote })
      });
    },
    getVotes: function(flavorFrenzyId: string) {
      return fetch(`${Endpoints.FlavorFrenzy.GET_VOTES}/${flavorFrenzyId}`);
    }
  }
};

export default Firestore;
