import { createSlice } from "@reduxjs/toolkit";
import { Category, ProductType } from "../../interface";
import {
  getAllCategory,
  getProducts,
  updateCategory,
  deleteCategory,
  addCategory,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProduct,
} from "../../service/product.service";

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
      .addCase(getProduct.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        const product = action.payload;
        const index = state.product.findIndex((prod) => prod.id === product.id);
        if (index !== -1) {
          state.product[index] = product;
        } else {
          state.product.push(product);
        }
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.category = action.payload;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.category.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.category.findIndex(
          (cat) => cat.id === action.payload.id
        );
        if (index !== -1) {
          state.category[index] = action.payload;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        const categoryId = action.payload;
        // Xóa category
        state.category = state.category.filter((cat) => cat.id !== categoryId);
        // Xóa các sản phẩm liên quan
        state.product = state.product.filter(
          (prod) => prod.idCategory !== categoryId
        );
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.product.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        const index = state.product.findIndex(
          (product) => product.id === updatedProduct.id
        );
        if (index !== -1) {
          state.product[index] = updatedProduct;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.product = state.product.filter(
          (pro) => pro.id !== action.payload
        );
      });
  },
});

export default productReducer.reducer;
