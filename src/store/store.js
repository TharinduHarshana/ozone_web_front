import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductSlice from "./admin/product-slice";
import shopingProductSlice from "./shop/product-slice";
import shopCartSlice from "./shop/cart-slice";
import shopAddressSlice from "./shop/address-slice"
import shopOrderSlice from "./shop/order-slice";
import adminOrderSlice from "../store/admin/order-slice";
import shopSearchSlice from "../store/shop/search-slice";
import shopReviewSlice from "../store/shop/review-slice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        AdminProducts : AdminProductSlice,
        shopProduct : shopingProductSlice,
        shopCart : shopCartSlice,
        shopAddress: shopAddressSlice,
        shopOrder: shopOrderSlice,
        adminOrder : adminOrderSlice,
        shopSearch: shopSearchSlice,
        shopReview: shopReviewSlice,


    },

});

export default store;