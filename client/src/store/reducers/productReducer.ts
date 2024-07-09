import { createSlice } from "@reduxjs/toolkit";
import { Category, ProductType } from "../../interface";
import { getAllCategory, getProducts, updateCategory, deleteCategory, addCategory } from "../../service/product.service";

const listProduct: ProductType[] = [];
const listCategory: Category[] = [];

const productReducer = createSlice({
  name: "productReducer",
  initialState: {
    product: listProduct,
    category: listCategory,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.category = action.payload;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.category.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.category.findIndex(cat => cat.id === action.payload.id);
        if (index !== -1) {
          state.category[index] = action.payload;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.category = state.category.filter(cat => cat.id !== action.payload);
      });
  },
});


export default productReducer.reducer;
