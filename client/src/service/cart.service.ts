import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CartDetail } from "../interface";

// Hàm lấy giỏ hàng
export const loadCart: any = createAsyncThunk("cart/loadCart", async () => {
  const res = await axios.get(`http://localhost:8080/cart`);
  return res.data;
});

export const getCart: any = createAsyncThunk(
  "cart/getCart",
  async ({ page, limit }: { page: number; limit: number }) => {
    const res = await axios.get(
      `http://localhost:8080/cart?page=${page}&limit=${limit}`
    );
    return res.data;
  }
);

export const loadHistory: any = createAsyncThunk(
  "history/loadHistory",
  async (idUser: number) => {
    const res = await axios.get(`http://localhost:8080/history?idUser=${idUser}`);
    return res.data;
  }
);

export const getHistory: any = createAsyncThunk(
  "history/getHistory",
  async ({ page, limit }: { page: number; limit: number }) => {
    const res = await axios.get(
      `http://localhost:8080/history?page=${page}&limit=${limit}`
    );
    return res.data;
  }
);

export const addHistory: any = createAsyncThunk(
  "history/addHistory",
  async (newHistory: any) => {
    const res = await axios.post(`http://localhost:8080/history`, newHistory);
    return res.data;
  }
);

export const updatedQuantityCart: any = createAsyncThunk(
  "cart/updateCart",
  async ({ id, updateQuantity }: { id: number; updateQuantity: number }) => {
    const res = await axios.patch(`http://localhost:8080/cart/${id}`, {
      quantity: updateQuantity,
    });
    return res.data;
  }
);

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
export const removeFromCart: any = createAsyncThunk(
  "cart/removeFromCart",
  async (id: number) => {
    const res = await axios.delete(`http://localhost:8080/cart/${id}`);
    return res.data;
  }
);

// Hàm cập nhật thông tin sản phẩm
export const buyProduct: any = createAsyncThunk(
  "product/updateProduct",
  async ({
    id,
    totalBuy,
    purchaseCount,
  }: {
    id: number;
    totalBuy: number;
    purchaseCount: number;
  }) => {
    const res = await axios.patch(`http://localhost:8080/products/${id}`, {
      total: totalBuy,
      purchaseCount,
    });
    return res.data;
  }
);
