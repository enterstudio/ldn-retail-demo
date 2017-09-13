import {ActionTypes} from '@constants/';

const initialState = {
    products: [],
    cart: []
};

export default function productsReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.PRODUCTS_LOADED: {
            const products = action.products;
            return {
                ...state,
                products
            };
        }
        case ActionTypes.UPDATE_CART: {
            const cart = action.cart;
            return {
                ...state,
                cart
            };
        }
        default:
            return state;
    }
}