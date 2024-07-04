import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../../interface";
import { getProducts } from "../../service/product.service";



const listProduct: ProductType[] = []

const productReducer = createSlice({
    name: "productReducer",
    initialState: {
        product: listProduct
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getProducts.fulfilled, (state, action)=> {
            state.product = action.payload
        })
    }
})

export default productReducer.reducer