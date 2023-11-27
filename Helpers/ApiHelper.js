import { createAsyncThunk } from "@reduxjs/toolkit"
import { Axios } from "./AxiosHelper"

export const getProducts = createAsyncThunk(
    'getProducts',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Axios.get('https://fakestoreapi.com/products')
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getUserCart = createAsyncThunk(
    'getCart',
    async (payload, { rejectWithValue }) => {
        const id = payload
        try {
            const response = await Axios.get(`https://fakestoreapi.com/carts/${id}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)