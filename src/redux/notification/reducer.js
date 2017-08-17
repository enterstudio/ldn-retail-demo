import {ActionTypes} from '@constants/';

const initialState = {};

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SHOW_NOTIFICATION: {
        const message = action.message;
        return {
          ...state,
          message
        };
    }
    default:
      return state;
  }
}
