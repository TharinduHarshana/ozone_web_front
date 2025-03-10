import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    isLoading : false,
    productList : [],
}

export const addNewProduct = createAsyncThunk(
    "/products/addnewproduct",
    async (formData) => {
      const result = await axios.post(
        "https://ozonecomputers.vercel.app/api/admin/products/add",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return result?.data;
    }
  );



  export const fetchAllProducts = createAsyncThunk(
    "/products/fetchAllProducts",
    async () => {
      const result = await axios.get(
        "https://ozonecomputers.vercel.app/api/admin/products/get",
      );
  
      return result?.data;
    }
  );


  

  export const editProduct = createAsyncThunk(
    "/products/editProduct",
    async ({id,formData}) => {
      const result = await axios.put(
        `https://ozonecomputers.vercel.app/api/admin/products/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return result?.data;
    }
  );





  export const deleteProduct = createAsyncThunk(
    "/products/deleteProduct",
    async (id,formData) => {
      const result = await axios.delete(
        `https://ozonecomputers.vercel.app/api/admin/products/delete/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return result?.data;
    }
  );



const AdminProductSlice = createSlice({
    name : "adminProduct",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchAllProducts.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchAllProducts.fulfilled, (state, action) => {
            console.log(action.payload.data);
            state.isLoading = false;
            state.productList = action.payload.data;
        })

        .addCase(fetchAllProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.productList = [];
        })
        
    }
})


export default AdminProductSlice.reducer;