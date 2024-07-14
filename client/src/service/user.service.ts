import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import CryptoJS from "crypto-js";
import { User } from "../interface";

export const getAllAccount: any = createAsyncThunk(
  "user/getAllAccount",
  async () => {
    const res = await axios.get("http://localhost:8080/accounts");
    return res.data;
  }
);

export const getUser: any = createAsyncThunk(
  "user/getAllAccount",
  async () => {
    const res = await axios.get("http://localhost:8080/accounts");
    return res.data;
  }
);

export const register: any = createAsyncThunk(
  "user/registerUser",
  async (newUser: any) => {
    const {
      name,
      age,
      address,
      numberPhone,
      email,
      password,
      image,
      role,
      created_at,
      updated_at,
      status,
    } = newUser;
    const EncryptedPassword = CryptoJS.AES.encrypt(
      password,
      "secret_key"
    ).toString();

    // Lấy thời gian đăng ký 
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0 nên cần +1
    const day = String(currentDate.getDate()).padStart(2, "0");
    const timeRegister = `${day}-${month}-${year}`;

    const response = await axios.post("http://localhost:8080/accounts", {
      name,
      age,
      address,
      numberPhone,
      email,
      password: EncryptedPassword,
      image,
      role,
      created_at: timeRegister,
      updated_at,
      status,
    });
    return response.data;
  }
);

export const login: any = createAsyncThunk("user/login", async (id: number) => {
  const response = await axios.patch(`http://localhost:8080/accounts/${id}`);
  return response.data;
});

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
    const response = await axios.patch(`http://localhost:8080/accounts/${id}`, {
      status: false,
    });
    return response.data;
  }
);

export const unblock: any = createAsyncThunk(
  "user/unblockUser",
  async (id: number) => {
    const response = await axios.patch(`http://localhost:8080/accounts/${id}`, {
      status: true,
    });
    return response.data;
  }
);

export const searchUserByName: any = createAsyncThunk(
  "user/searchUserByName",
  async (name: string) => {
    const response = await axios.get(`http://localhost:8080/accounts?name_like=${name}&_sort=id&_order=desc`);
    return response.data;
  }
);

export const updateUser: any = createAsyncThunk(
  "user/updateUser",
  async (updatedUser: User, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:8080/accounts/${updatedUser.id}`, updatedUser);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);