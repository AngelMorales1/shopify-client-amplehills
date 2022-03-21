import sanityClient from '@sanity/client';

export const SanityClient = sanityClient({
  projectId: '1v8tcmfe',
  dataset: 'production',
  useCdn: true
});

export default SanityClient;
