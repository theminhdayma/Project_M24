import { createSlice } from "@reduxjs/toolkit";
import { CartDetail, ProductType } from "../../interface";
import { getCart, addToCart, buyProduct, removeFromCart } from "../../service/cart.service";

const listCartDetail: CartDetail[] = [];
const listProduct: ProductType[] = [];

const cartReducer = createSlice({
  name: "cartReducer",
  initialState: {
    product: listProduct,
    cartDetail: listCartDetail
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.fulfilled, (state, action) => {
        state.cartDetail = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const addedProduct = action.payload;
        const existingIndex = state.cartDetail.findIndex(
          (item) => item.idUser === addedProduct.idUser && item.idProduct === addedProduct.idProduct
        );
        if (existingIndex !== -1) {
          // Nếu đã có sản phẩm trong giỏ hàng, cập nhật lại số lượng
          state.cartDetail[existingIndex].quantity = addedProduct.quantity;
        } else {
          // Nếu chưa có, thêm sản phẩm vào giỏ hàng
          state.cartDetail.push(addedProduct);
        }
      })
      builder.addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartDetail = state.cartDetail.filter(item => item.id !== action.meta.arg);
      })
      .addCase(buyProduct.fulfilled, (state, action) => {
        // Assuming action.payload contains the updated product data
        const updatedProduct = action.payload;
        // Find the index of the updated product in state.product array
        const index = state.product.findIndex(prod => prod.id === updatedProduct.id);
        if (index !== -1) {
          // If found, update the product at that index
          state.product[index] = updatedProduct;
        } else {
          // If not found, push the updated product to state.product array
          state.product.push(updatedProduct);
        }
      });
  }
});

export default cartReducer.reducer;
