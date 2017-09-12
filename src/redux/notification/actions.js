import {ActionTypes} from '@constants/';

export function showNotification(dispatch, message, deferred) {

      dispatch({ type: ActionTypes.SHOW_NOTIFICATION , message, deferred});

}
