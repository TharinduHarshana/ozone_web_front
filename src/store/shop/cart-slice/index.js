import { createAsyncThunk, createSlice } from  "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    cartItem :[],
    isLoading : false,
}

export const addToCart = createAsyncThunk('cart/addToCart', async ({userId, productId, quantity})=>{

    const response = await axios.post("https://ozone-web-server.vercel.app/api/shop/cart/add",{userId, productId, quantity});
    console.log(response.data,"response");
    return response.data;


})


export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async (userId)=>{

    const response = await axios.get(`https://ozone-web-server.vercel.app/api/shop/cart/get/${userId}`);
    console.log(response.data,"response");
    return response.data;


})


export const deleteCartItems = createAsyncThunk('cart/deleteCartItems', async ({userId, productId})=>{

    const response = await axios.delete(`https://ozone-web-server.vercel.app/api/shop/cart/${userId}/${productId}`);
    return response.data;


})


export const updateCartQuantity = createAsyncThunk('cart/updateCartQuantity', async ({userId, productId, quantity})=>{

    const response = await axios.put("https://ozone-web-server.vercel.app/api/shop/cart/update-cart",{userId, productId, quantity});
    return response.data;


})

export const clearCart = createAsyncThunk('cart/clearCart', async (userId) => {
    const response = await axios.delete(`https://ozone-web-server.vercel.app/api/shop/cart/clear/${userId}`);
    return response.data;
  });




const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers:{},
    extraReducers :(builder)=>{
        builder.addCase(addToCart.pending, (state)=>{
            state.isLoading = true;
        }).addCase(addToCart.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.cartItem = action.payload.data;
        }).addCase(addToCart.rejected, (state)=>{
            state.isLoading = false;
            state.cartItem = [];


        }).addCase(fetchCartItems.pending, (state)=>{
            state.isLoading = true;
        }).addCase(fetchCartItems.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.cartItem = action.payload.data;
        }).addCase(fetchCartItems.rejected, (state)=>{
            state.isLoading = false;
            state.cartItem = [];



        }).addCase(deleteCartItems.pending, (state)=>{
            state.isLoading = true;
        }).addCase(deleteCartItems.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.cartItem = action.payload.data;
        }).addCase(deleteCartItems.rejected, (state)=>{
            state.isLoading = false;
            state.cartItem = [];



        }).addCase(updateCartQuantity.pending, (state)=>{
            state.isLoading = true;
        }).addCase(updateCartQuantity.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.cartItem = action.payload.data;
        }).addCase(updateCartQuantity.rejected, (state)=>{
            state.isLoading = false;
            state.cartItem = [];




        }).addCase(clearCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.isLoading = false;
                state.cartItem = []; // Clear cart state
            })
            .addCase(clearCart.rejected, (state) => {
                state.isLoading = false;
            });

    },
})

export default shoppingCartSlice.reducer;