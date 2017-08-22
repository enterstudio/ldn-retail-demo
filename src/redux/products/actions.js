import { Firebase, FirebaseRef } from '@constants/';
import {ActionTypes} from '@constants/';


export function getAllProducts() {

    if (Firebase === null) return () => new Promise(resolve => resolve());

    return dispatch => new Firebase.Promise((resolve) => {
        const ref = FirebaseRef.child('products');

        return ref.once('value')
            .then(function(snapshot) {
                const products = snapshot.val() || {};
                return resolve(dispatch({
                    type: ActionTypes.PRODUCTS_LOADED,
                    products,
                }));

            });


    });
}