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
                    products
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
        if(index !== -1) {

            dispatch({type: ActionTypes.UPDATE_CART, cart :  [
                ... cart.slice(0, index),
                ... cart.slice(index + 1)

            ]})
        }
    }

}

export function addToCart(itemToAdd){
    return (dispatch, getState) => {

        let cart = getState().products.cart;
        const index = cart.findIndex(function(item){
                return itemToAdd.id === item.id;
            }
        );
        if(index === -1) {
            dispatch({type: ActionTypes.UPDATE_CART, cart: [...cart, itemToAdd]})
        }
    }
}

export function removeFromProducts(itemToRemove) {
    console.log('remove from products')

    return (dispatch, getState) => {

        let products = getState().products.products;
        const index = products.findIndex(function(item){
                return itemToRemove.id === item.id;
            }
        );
        if(index !== -1) {

            dispatch({type: ActionTypes.UPDATE_PRODUCTS, products:  [
                ... products.slice(0, index),
                ... products.slice(index + 1)

            ]})
        }
    }

}

export function addToProducts(itemToAdd){
    return (dispatch, getState) => {

        let products = getState().products.products;
        const index = products.findIndex(function(item){
                return itemToAdd.id === item.id;
            }
        );
        if(index === -1) {
            dispatch({type: ActionTypes.UPDATE_PRODUCTS, products: [...products, itemToAdd]})
        }
    }
}