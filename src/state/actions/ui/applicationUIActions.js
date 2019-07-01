import uuid from 'uuid';
import Data from 'lib/Data';
import FlashMessages from 'constants/FlashMessages';
import ParamMatches from 'constants/ParamMatches';
import getUrlParam from 'utils/getUrlParam';
import get from 'utils/get';

export const GET_GLOBAL_SETTINGS = 'GET_GLOBAL_SETTINGS';
export const getGlobalSettings = () => dispatch => {
  return dispatch({
    type: GET_GLOBAL_SETTINGS,
    payload: Data.getEntries({
      content_type: 'globalSettings',
      include: 4
    })
  });
};

export const SET_FLASH_MESSAGE = 'SET_FLASH_MESSAGE';
export const setFlashMessage = message => ({
  type: SET_FLASH_MESSAGE,
  payload: {
    uuid: uuid(),
    message
  }
});

export const UNSET_FLASH_MESSAGE = 'UNSET_FLASH_MESSAGE';
export const unsetFlashMessage = uuid => ({
  type: UNSET_FLASH_MESSAGE,
  payload: uuid
});

export const CHECK_FOR_FLASH_MESSAGES = 'CHECK_FOR_FLASH_MESSAGES';
export const checkForFlashMessages = () => dispatch => ({
  type: CHECK_FOR_FLASH_MESSAGES,
  payload: new Promise(resolve => {
    Object.entries(ParamMatches).forEach(([paramKey, expected]) => {
      if (getUrlParam(paramKey) === expected) {
        const message = get(FlashMessages, paramKey);
        if (message) dispatch(setFlashMessage(message));
      }
    });

    resolve();
  })
});
