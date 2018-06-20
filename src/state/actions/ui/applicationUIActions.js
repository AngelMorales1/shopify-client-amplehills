import Data from 'lib/Data';

export const GET_LOCATION_DATA = 'GET_LOCATION_DATA';
export const getLocationData = payload => {
  return {
    type: GET_LOCATION_DATA,
    payload: Data.getLocations()
  };
};

export const GET_GLOBAL_SETTINGS = 'GET_GLOBAL_SETTINGS';
export const getGlobalSettings = payload => {
  return {
    type: `GET_GLOBAL_SETTINGS`,
    payload: Data.getGlobalSettings()
  };
};

export const GET_OUR_PLEDGE = 'GET_OUR_PLEDGE';
export const getOurPledge = payload => {
  return {
    type: `GET_OUR_PLEDGE`,
    payload: Data.getOurPledge()
  };
};
