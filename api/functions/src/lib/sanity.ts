import sanityClient from '@sanity/client';

export const SanityClient = sanityClient({
  projectId: '1v8tcmfe',
  dataset: 'production',
  useCdn: true
});

export const Sanity = {
  fetchEventByTitle: function(title: string) {
    const query = `*[_type == 'event' && name == '${title}'][0] {
      ...,
      'location': location->{ name, title, address1, address2, city, state, zip }
    }`;

    return SanityClient.fetch(query);
  }
};

export default Sanity;
