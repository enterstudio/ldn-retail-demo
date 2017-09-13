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

export function removeFromCart(itemToRemove) {

    return (dispatch, getState) => {

        let cart = getState().products.cart;
        const index = cart.findIndex(function(item){
                 return itemToRemove.id === item.id;
            }
        );
        cart = [
            ... cart.slice(0, index),
            ... cart.slice(index + 1)

        ]
        dispatch({type: ActionTypes.UPDATE_CART, cart})

    }

}

export function addToCart(item){
    return (dispatch, getState) => {

        let cart = getState().products.cart;
        dispatch({type: ActionTypes.UPDATE_CART, cart: [...cart, item]})

    }
}