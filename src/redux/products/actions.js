import { Firebase, FirebaseRef } from '@constants/';
import {ActionTypes} from '@constants/';


export function getAllProducts() {

    if (Firebase === null) return () => new Promise(resolve => resolve());

    return dispatch => new Firebase.Promise((resolve) => {
        const ref = FirebaseRef.child('products');

        return ref.once('value')
            .then(function(snapshot) {
                const allProducts = snapshot.val() || {};
                return resolve(dispatch({
                    type: ActionTypes.PRODUCTS_LOADED,
                    allProducts
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

export function addToProducts(itemId){
    return (dispatch, getState) => {

        let products = getState().products.products;
        const index = products.findIndex(function(item){
                return itemId === item.id;
            }
        );
        if(index === -1) {

            let allProducts = getState().products.allProducts;
            const product = allProducts.find(function (item) {
                    return itemId === item.id;
                }
            );
            if (product) {
                dispatch({type: ActionTypes.UPDATE_PRODUCTS, products: [...products, product]})
            }
        }
    }
}