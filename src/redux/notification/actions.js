import {ActionTypes} from '@constants/';

export function showNotification(dispatch, message) {

      dispatch({ type: ActionTypes.SHOW_NOTIFICATION , message });

}
