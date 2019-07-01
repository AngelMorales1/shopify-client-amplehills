import {
  GET_GLOBAL_SETTINGS,
  SET_FLASH_MESSAGE,
  UNSET_FLASH_MESSAGE
} from 'state/actions/ui/applicationUIActions';

const initialState = {
  globalSettings: {},
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
