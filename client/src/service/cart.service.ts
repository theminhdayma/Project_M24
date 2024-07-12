import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CartDetail } from "../interface";

// Hàm lấy giỏ hàng
export const getCart: any = createAsyncThunk("cart/getCart", async ({ page, limit }: { page: number; limit: number }) => {
  const res = await axios.get(`http://localhost:8080/cart?page=${page}&limit=${limit}`);
  return res.data;
});

// Hàm thêm vào giỏ hàng
export const addToCart: any = createAsyncThunk(
  "cart/addToCart",
  async (product: CartDetail) => {
    const { data: existingCart } = await axios.get(
      `http://localhost:8080/cart?idUser=${product.idUser}`
    );

    const existingItem = existingCart.find(
      (item: CartDetail) => item.idProduct === product.idProduct
    );

    if (existingItem) {
      const updatedQuantity = existingItem.quantity + product.quantity;
      const res = await axios.patch(
        `http://localhost:8080/cart/${existingItem.id}`,
        {
          quantity: updatedQuantity,
        }
      );
      return res.data;
    } else {
      const res = await axios.post("http://localhost:8080/cart", product);
      return res.data;
    }
  }
);

// Hàm xóa sản phẩm khỏi giỏ hàng
export const removeFromCart: any = createAsyncThunk("cart/removeFromCart", async (id: number) => {
  const res = await axios.delete(`http://localhost:8080/cart/${id}`);
  return res.data;
});

// Hàm cập nhật tổng số lượng sản phẩm
export const buyProduct: any = createAsyncThunk(
  "product/updateTotal",
  async ({ id, totalBuy }: { id: number; totalBuy: number }) => {
    const res = await axios.patch(`http://localhost:8080/products/${id}`, {
      totalBuy,
    });
    return res.data;
  }
);
