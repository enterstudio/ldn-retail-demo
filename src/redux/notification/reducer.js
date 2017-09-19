import {ActionTypes} from '@constants/';

const initialState = {};

export default function notificationReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SHOW_NOTIFICATION:
        {
            console.log('in reducer: notication props: ' + JSON.stringify(action))
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
