import {ActionTypes} from '@constants/';

export async function sendUserInRangeEvent(user) {

    console.log('sending user in range event: ' + JSON.stringify(user));

    try {
        // TODO rename endpoint
        let response = await fetch('http://10.132.73.30:9000/api/beacon', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user
            })
        })
        let responseJson =  await response.json();
        console.log('response user in range event: ' + JSON.stringify(responseJson));

    } catch(error){
        console.error('error posting user in range event', error);
    }
}