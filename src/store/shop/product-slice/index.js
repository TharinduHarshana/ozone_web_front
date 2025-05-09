import axios from "axios";
import { createSlice, createAsyncThunk } from"@reduxjs/toolkit";


const initialState = {
    isLoading : false,
    productList : [],
    productDetails : null
};


export const fetchAllFilteredProducts = createAsyncThunk(
    "/products/fetchAllFilteredProducts",
    async ({filterParams , sortParams}) => {
    
        const query = new URLSearchParams({
            ...filterParams,
            sortBy : sortParams
        });
        const result = await axios.get(
        `https://ozonecomputers.vercel.app/api/shop/products/get?${query}`,
      );
  
      return result?.data;
    }
  );

  export const fetchProductDetails = createAsyncThunk(
    "/products/fetchProductDetails",
    async (id) => {
    
        const result = await axios.get(
        `https://ozonecomputers.vercel.app/api/shop/products/get/${id}`,
      );
  
      return result?.data;
      
    }
  );


const shopingProductSlice = createSlice({
    name:"shoppingProducts",
    initialState,
    reducers : {
        setProductDetails : (state) => {
            state.productDetails = null
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(fetchAllFilteredProducts.pending, (state, action)=>{
            state.isLoading = true;
        }).addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productList = action.payload.data;
        }).addCase(fetchAllFilteredProducts.rejected, (state) => {
            state.isLoading = false;
            state.productList = [];
        })
        .addCase(fetchProductDetails.pending, (state, action)=>{
            state.isLoading = true;
        }).addCase(fetchProductDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productDetails = action.payload.data;
        }).addCase(fetchProductDetails.rejected, (state) => {
            state.isLoading = false;
            state.productDetails = null;
        })

    }
});
export const { setProductDetails } = shopingProductSlice.actions;

export default shopingProductSlice.reducer;