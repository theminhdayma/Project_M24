import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductType } from "../interface";

export const getProducts: any = createAsyncThunk(
  "product/getProducts",
  async () => {
    const res = await axios.get("http://localhost:8080/products");
    return res.data;
  }
);

export const getAllCategory: any = createAsyncThunk(
  "category/getAllCategory",
  async () => {
    const res = await axios.get("http://localhost:8080/category");
    return res.data;
  }
);

export const addCategory: any = createAsyncThunk(
  "category/addcategory",
  async (newCategory: any) => {
    const { name, description, products, created_at, status } = newCategory;
    // Lấy thời gian đăng ký
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const timeCreate = `${day}-${month}-${year}`;
    const res = await axios.post("http://localhost:8080/category", {
      name,
      description,
      products,
      created_at: timeCreate,
      status,
    });
    return res.data;
  }
);

export const updateCategory: any = createAsyncThunk(
  "category/updateCategory",
  async (updatedCategory: any) => {
    const { id, name, description, products, created_at, status } =
      updatedCategory;
    const res = await axios.put(`http://localhost:8080/category/${id}`, {
      name,
      description,
      products,
      created_at,
      status,
    });
    return res.data;
  }
);

export const deleteCategory: any = createAsyncThunk(
  "category/deleteCategory",
  async (id: number) => {
    await axios.delete(`http://localhost:8080/category/${id}`);
    return id;
  }
);

// Product

export const addProduct: any = createAsyncThunk(
  "product/addProduct",
  async (newProduct: any) => {
    const {
      idCategory,
      brand,
      name,
      total,
      price,
      purchaseCount,
      description,
      imageProduct,
      created_at,
      updated_at,
      statusProduct,
    } = newProduct;

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const timeCreate = `${day}-${month}-${year}`;

    const res = await axios.post("http://localhost:8080/products", {
      idCategory: Number(idCategory),
      brand,
      name,
      total,
      price,
      purchaseCount,
      description,
      imageProduct,
      created_at: timeCreate,
      updated_at,
      statusProduct,
    });

    return res.data;
  }
);

export const updateProduct: any = createAsyncThunk(
  "product/updateProduct",
  async (updatedProduct: ProductType) => {
    const res = await axios.put(
      `http://localhost:8080/products/${updatedProduct.id}`,
      updatedProduct
    );
    return res.data;
  }
);

export const deleteProduct: any = createAsyncThunk(
  "product/deleteProduct",
  async (id: number) => {
    await axios.delete(`http://localhost:8080/products/${id}`);
    return id;
  }
)

export const getProductById: any = createAsyncThunk(
  "product/getProductById",
  async (id: number) => {
    const res = await axios.get(`http://localhost:8080/products/${id}`);
    return res.data;
  }
);
