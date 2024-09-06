import { createSlice } from "@reduxjs/toolkit";
import { CartDetail, History, ProductType } from "../../interface";
import {
  getCart,
  addToCart,
  buyProduct,
  removeFromCart,
  getHistory,
  addHistory,
  loadCart,
  updatedQuantityCart,
  loadHistory,
  updateOrderStatus,
} from "../../service/cart.service";

const listCartDetail: CartDetail[] = [];
const listProduct: ProductType[] = [];
const listHistory: History[] = [];

const cartReducer = createSlice({
  name: "cartReducer",
  initialState: {
    product: listProduct,
    cartDetail: listCartDetail,
    history: listHistory,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.fulfilled, (state, action) => {
        state.cartDetail = action.payload;
      })
      .addCase(loadCart.fulfilled, (state, action) => {
        state.cartDetail = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const addedProduct = action.payload;
        const existingIndex = state.cartDetail.findIndex(
          (item) =>
            item.idUser === addedProduct.idUser &&
            item.idProduct === addedProduct.idProduct
        );
        if (existingIndex !== -1) {
          // Nếu đã có sản phẩm trong giỏ hàng, cập nhật lại số lượng
          state.cartDetail[existingIndex].quantity = addedProduct.quantity;
        } else {
          // Nếu chưa có, thêm sản phẩm vào giỏ hàng
          state.cartDetail.push(addedProduct);
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartDetail = state.cartDetail.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(buyProduct.fulfilled, (state, action) => {
        // Assuming action.payload contains the updated product data
        const updatedProduct = action.payload;
        // Find the index of the updated product in state.product array
        const index = state.product.findIndex(
          (prod) => prod.id === updatedProduct.id
        );
        if (index !== -1) {
          // If found, update the product at that index
          state.product[index] = updatedProduct;
        }
      })
      .addCase(loadHistory.fulfilled, (state, action) => {
        state.history = action.payload;
      })
      .addCase(getHistory.fulfilled, (state, action) => {
        state.history = action.payload;
      })
      .addCase(addHistory.fulfilled, (state, action) => {
        state.history.push(action.payload);
      })
      .addCase(updatedQuantityCart.fulfilled, (state, action) => {
        // Cập nhật số lượng sản phẩm trong giỏ hàng sau khi cập nhật thành công
        const updatedCartItem = action.payload;
        const index = state.cartDetail.findIndex(
          (item) => item.id === updatedCartItem.id
        );
        if (index !== -1) {
          state.cartDetail[index].quantity = updatedCartItem.quantity;
        }
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        const index = state.history.findIndex(
          (order) => order.id === updatedOrder.id
        );
        if (index !== -1) {
          state.history[index].status = updatedOrder.status;
        }
      });
  },
});

export default cartReducer.reducer;
