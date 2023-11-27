import { getProducts } from '@/Helpers/ApiHelper';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    products: [],
    errorMessage: ""
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.payload
            })
    }
})

export const selectIsLoading = (state) => state.products.isLoading
export const selectProducts = (state) => state.products.products
export const selectErrorMessage = (state) => state.products.errorMessage

export default productSlice.reducer