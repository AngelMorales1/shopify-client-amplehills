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
  fetchGlobalSettings: function() {
    const previewId = getPreviewId();
    const client = !!previewId ? SanityPreviewClient : SanityClient;

    const query = `*[_type == 'settings' && _id == '_settings'][0] ${
      Groq.Settings
    }`;

    return client.fetch(query).then(Serializers.settings);
  },
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
  },
  fetchProducts: function() {
    const previewId = false; // TO-DO
    const client = !!previewId ? SanityPreviewClient : SanityClient;
    const query = `*[_type == 'product'] ${Groq.Product}`;

    return client.fetch(query).then(Serializers.products);
  },
  fetchFlavors: function() {
    const previewId = false; // TO-DO
    const client = !!previewId ? SanityPreviewClient : SanityClient;
    const query = `*[_type == 'flavor'] ${Groq.Flavor}`;

    return client.fetch(query).then(Serializers.flavors);
  },
  fetchLocations: function() {
    const previewId = false; // TO-DO
    const client = !!previewId ? SanityPreviewClient : SanityClient;
    const query = `*[_type == 'location'] ${Groq.Location}`;

    return client.fetch(query).then(Serializers.locations);
  },
  fetchGenericPage: function(slug) {
    const previewId = false; // TO-DO
    const client = !!previewId ? SanityPreviewClient : SanityClient;
    const query = `*[_type == 'page' && slug == '${slug}'][0] ${Groq.Page}`;

    return client.fetch(query).then(Serializers.page);
  },
  fetchEvents: function() {
    const previewId = false; // TO-DO
    const client = !!previewId ? SanityPreviewClient : SanityClient;
    const query = `*[_type == 'event'] ${Groq.Event}`;

    return client.fetch(query).then(Serializers.event);
  }
};

export default Sanity;
