import sanityClient from '@sanity/client';

export const SanityClient = sanityClient({
  projectId: 'dln5ca6t',
  dataset: 'production',
  apiVersion: '2022-04-01',
  useCdn: true
});

export const Sanity = {
  fetchEventByTitle: function(title: string) {
    const query = `*[_type == 'event' && references(*[_type == 'product' && store.title == '${title}']._id)][0] {
      ...,
      'location': location->{ name, title, address1, address2, city, state, zip },
      'product': product->{
        ...,
        'store': {
          ...store,
          'variants': store.variants[]->{ ... }
        }
      }
    }`;

    return SanityClient.fetch(query);
  }
};

export default Sanity;
