import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import CryptoJS from "crypto-js";

export const getAllAccount: any = createAsyncThunk(
  "user/getAllAccount",
  async () => {
    const res = await axios.get("http://localhost:8080/accounts");
    return res.data;
  }
);

export const register: any = createAsyncThunk(
  "user/registerUser",
  async (newUser: any) => {
    const { name, age, address, numberPhone, email, passwords, image, role, status } = newUser;
    const password = CryptoJS.DES.encrypt(
      passwords,
      "secret_key"
    ).toString();

    const response = await axios.post("http://localhost:8080/accounts", { name, age, address, numberPhone, email, password, image, role, status });
    return response.data;
  }
);

export const login: any = createAsyncThunk(
  "user/login",
  async (id: number) => {
    const response = await axios.patch(`http://localhost:8080/accounts/${id}`);
    return response.data;
  }
);

export const logout: any = createAsyncThunk(
  "user/logoutUser",
  async (id: number) => {
    const response = await axios.patch(`http://localhost:8080/accounts/${id}`);
    return response.data;
  }
);

export const block: any = createAsyncThunk(
  "user/blockUser",
  async (id: number) => {
    const response = await axios.patch(`http://localhost:8080/accounts/${id}`, { status: false });
    return response.data;
  }
);

export const unblock: any = createAsyncThunk(
  "user/unblockUser",
  async (id: number) => {
    const response = await axios.patch(`http://localhost:8080/accounts/${id}`, { status: true });
    return response.data;
  }
);
