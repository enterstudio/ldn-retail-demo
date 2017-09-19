import {ActionTypes} from '@constants/';

const initialState = {};

export default function notificationReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SHOW_NOTIFICATION:
        {
            return {
                ...state,
                message: action.message,
                deferred: action.deferred,
                okText: action.okText,
                cancelText: action.cancelText
            };
        }
        default:
            return state;
    }
}
