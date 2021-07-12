import {
  GET_GLOBAL_SETTINGS,
  FETCH_GLOBAL_SETTINGS,
  SET_FLASH_MESSAGE,
  UNSET_FLASH_MESSAGE
} from 'state/actions/ui/applicationUIActions';

const initialState = {
  globalSettings: {}, // TO-DO remove
  settings: {},
  flashMessages: []
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${GET_GLOBAL_SETTINGS}_FULFILLED`:
      return {
        ...state,
        globalSettings: action.payload
      };
    case `${FETCH_GLOBAL_SETTINGS}_FULFILLED`:
      return {
        ...state,
        settings: action.payload
      };
    case SET_FLASH_MESSAGE:
      return {
        ...state,
        flashMessages: state.flashMessages.concat([action.payload])
      };
    case UNSET_FLASH_MESSAGE:
      return {
        ...state,
        flashMessages: state.flashMessages.filter(
          flash => flash.uuid !== action.payload
        )
      };
    default:
      return state;
  }
};
