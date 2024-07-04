import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUser: any = createAsyncThunk(
  "user/getAllUser",
  async () => {
    const res = await axios.get("http://localhost:8080/users");
    return res.data;
  }
);

export const registerUser: any = createAsyncThunk(
  "user/registerUser",
  async (newUser: any) => {
    const { nameUser, age, address, numberPhone, email, password, imageUser, role, statusUser } = newUser;
    const response = await axios.post("http://localhost:8080/users", { nameUser, age, address, numberPhone, email, password, imageUser, role, statusUser });
    return response.data;
  }
);

export const login: any = createAsyncThunk(
  "user/login",
  async (userId: number) => {
    const response = await axios.patch(`http://localhost:8080/users/${userId}`, { statusUser: true });
    return response.data;
  }
);

export const logout: any = createAsyncThunk(
  "user/logoutUser",
  async (userId: number) => {
    const response = await axios.patch(`http://localhost:8080/users/${userId}`, { statusUser: false });
    return response.data;
  }
);