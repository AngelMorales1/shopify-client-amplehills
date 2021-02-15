import sanityClient from '@sanity/client';

import * as Groq from 'lib/Groq';
import * as Serializers from 'lib/Serializers';

export const SanityClient = sanityClient({
  projectId: '1v8tcmfe',
  dataset: 'production',
  useCdn: true
});

export const Sanity = {
  fetchFlavorFrenzy: function(slug) {
    return SanityClient.fetch(
      `*[_type == 'flavorFrenzy' && slug == '${slug}'][0] ${Groq.FlavorFrenzy}`
    ).then(Serializers.flavorFrenzy);
  }
};

export default Sanity;
