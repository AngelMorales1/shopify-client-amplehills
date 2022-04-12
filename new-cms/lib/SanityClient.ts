import sanityClient from '@sanity/client';

export const SanityClient = sanityClient({
  projectId: 'dln5ca6t',
  dataset: 'production',
  useCdn: true
});

export default SanityClient;
