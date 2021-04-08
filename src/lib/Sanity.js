import sanityClient from '@sanity/client';

import * as Groq from 'lib/Groq';
import * as Serializers from 'lib/Serializers';
import getUrlParam from 'utils/getUrlParam';

export const SanityClient = sanityClient({
  projectId: '1v8tcmfe',
  dataset: 'production',
  useCdn: true
});

export const SanityPreviewClient = sanityClient({
  projectId: '1v8tcmfe',
  dataset: 'production',
  token: process.env.REACT_APP_SANITY_PREVIEW_TOKEN,
  useCdn: false,
  withCredentials: true
});

const getPreviewId = () => getUrlParam('preview');

export const Sanity = {
  fetchFlavorFrenzy: function(slug) {
    const previewId = getPreviewId();
    const client = !!previewId ? SanityPreviewClient : SanityClient;

    const query = !!previewId
      ? `*[_type == 'flavorFrenzy' && slug == '${slug}' && _id == '${previewId}'][0] ${
          Groq.FlavorFrenzy
        }`
      : `*[_type == 'flavorFrenzy' && slug == '${slug}'][0] ${
          Groq.FlavorFrenzy
        }`;

    return client.fetch(query).then(Serializers.flavorFrenzy);
  },
  fetchInStores: function() {
    const previewId = getPreviewId();
    const client = !!previewId ? SanityPreviewClient : SanityClient;

    const query = !!previewId
      ? `*[_type == 'inStores' && _id == '${previewId}'][0] ${Groq.InStores}`
      : `*[_type == 'inStores' && _id == '_inStores'][0] ${Groq.InStores}`;

    return client.fetch(query).then(Serializers.inStores);
  },
  fetchRetailLocations: function() {
    const previewId = getPreviewId();
    const client = !!previewId ? SanityPreviewClient : SanityClient;
    const query = `*[_type == 'retailLocation'] ${Groq.RetailLocation}`;

    return client.fetch(query).then(Serializers.retailLocations);
  }
};

export default Sanity;
