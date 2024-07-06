import { login, logout, getAllAccount, register, block, unblock } from "../../service/user.service";
import { User } from "../../interface";
import { createSlice } from "@reduxjs/toolkit";
import { deleteLocal } from "./Local";

const listAccount: User[] = [];

const userReducer = createSlice({
  name: "user",
  initialState: {
    user: listAccount,
    loggedInUser: null, // Thêm trạng thái cho người dùng đang đăng nhập
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getAllAccount.fulfilled, (state: any, action: any) => {
        state.user = action.payload;
      })
      .addCase(register.fulfilled, (state: any, action: any) => {
        state.user.push(action.payload);
      })
      .addCase(login.fulfilled, (state: any, action: any) => {
        const index = state.user.findIndex((user: User) => user.id === action.payload.id);
        if (index !== -1) {
          state.user[index] = action.payload;
        }
        state.loggedInUser = action.payload; // Lưu thông tin người dùng đang đăng nhập
        localStorage.setItem("loggedInUser", JSON.stringify(action.payload)); // Lưu thông tin vào localStorage
      })
      .addCase(logout.fulfilled, (state: any, action: any) => {
        const index = state.user.findIndex((user: User) => user.id === action.payload.id);
        if (index !== -1) {
          state.user[index] = action.payload;
        }    
        state.loggedInUser = null;
        deleteLocal("loggedInUser")
      })
      .addCase(block.fulfilled, (state: any, action: any) => {
        const index = state.user.findIndex((user: User) => user.id === action.payload.id);
        if (index !== -1) {
          state.user[index] = action.payload;
        }
      })
      .addCase(unblock.fulfilled, (state: any, action: any) => {
        const index = state.user.findIndex((user: User) => user.id === action.payload.id);
        if (index !== -1) {
          state.user[index] = action.payload;
        }
      });
  },
});

export default userReducer.reducer;
