import {ActionTypes} from '@constants/';

export function sendUserInRangeEvent(user) {

    console.log('sending user in range event: ' + JSON.stringify(user));
    // TODO rename endpoint
    fetch('http://10.132.73.30:9000/api/beacon', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstName: user.firstName,
            lastName: user.lastName,
        })
    }).then(function(response) {
        console.log('sendUserInRangeEvent response: ' + response);
    });
}