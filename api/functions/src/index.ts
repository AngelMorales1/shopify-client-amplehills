import shipping from './routes/shipping';
import klaviyo from './routes/klaviyo';

import klaviyoV1 from './routes/v1/klaviyo';
import flavor_frenzy_votes from './routes/v1/flavor_frenzy/votes';
import flavor_frenzy_votes_create from './routes/v1/flavor_frenzy/votes/create';
import flavor_frenzy_votes_migrate from './routes/v1/flavor_frenzy/votes/migrate';
import flavor_frenzy_predictions_create from './routes/v1/flavor_frenzy/predictions/create';

export {
  shipping,
  klaviyo,

  klaviyoV1,
  flavor_frenzy_votes,
  flavor_frenzy_votes_create,
  flavor_frenzy_votes_migrate,
  flavor_frenzy_predictions_create
};
