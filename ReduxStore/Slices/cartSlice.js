import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    cart: { products: [] },
    errorMessage: ""
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const { productId, quantity } = action.payload;
            const existingProduct = state?.cart?.products?.find(product => product.productId === productId);

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                state?.cart?.products?.push({ productId, quantity });
            }
        },
        reduceProduct: (state, action) => {
            const { productId, quantity } = action.payload;
            // const existingProduct = state?.cart?.products?.find(product => product.productId === productId);
            const existingProductIndex = state?.cart?.products?.findIndex(product => product.productId === productId)

            if (quantity && existingProductIndex !== -1) {
                const existingProduct = state.cart.products[existingProductIndex];

                if (existingProduct.quantity > 1) {
                    existingProduct.quantity -= quantity;
                } else {
                    state.cart.products.splice(existingProductIndex, 1);
                }
            } else {
                state.cart.products.splice(existingProductIndex, 1);
            }
        },
        emptyCart: (state, action) => {
            state = initialState
            return state
        }
    },
})
export const { addProduct, reduceProduct, emptyCart } = cartSlice.actions;

export const selectIsLoading = (state) => state.cart.isLoading
export const selectCart = (state) => state.cart.cart
export const selectErrorMessage = (state) => state.cart.errorMessage

export default cartSlice.reducer