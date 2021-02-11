import sanityClient from '@sanity/client';

export const SanityClient = sanityClient({
  projectId: '1v8tcmfe',
  dataset: 'production',
  useCdn: true
});

export const Sanity = {
  fetchFlavorFrenzy: async function(slug) {
    return SanityClient.fetch(
      `*[_type == 'flavorFrenzy' && slug == '${slug}']`
    );
  }
};

export default Sanity;
