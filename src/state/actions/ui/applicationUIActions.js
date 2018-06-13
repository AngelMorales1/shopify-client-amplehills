import Data from 'lib/Data';

export const GET_LOCATION_DATA = 'GET_LOCATION_DATA';
export const getLocationData = payload => {
  return {
    type: GET_LOCATION_DATA,
    payload: new Promise(resolve => {
      resolve(Data.getLocations());
    })
  };
};
