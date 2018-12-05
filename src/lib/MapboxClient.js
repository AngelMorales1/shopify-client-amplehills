import MapboxClient from 'mapbox';
export default new MapboxClient(process.env.REACT_APP_MAPBOX_ACCESS_TOKEN);
