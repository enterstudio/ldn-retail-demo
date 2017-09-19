import {ActionTypes} from '@constants/';

export function showNotification(dispatch, message, deferred, okText, cancelText) {

      dispatch({ type: ActionTypes.SHOW_NOTIFICATION , message, deferred, okText, cancelText});

}
