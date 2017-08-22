import {ActionTypes} from '@constants/';

const initialState = {
    products: []
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
        default:
            return state;
    }
}