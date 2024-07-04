import { getAllUser, registerUser, login, logout } from "../../service/user.service";
import { User } from "../../interface";
import { createSlice } from "@reduxjs/toolkit";

const listUser: User[] = [];

const userReducer = createSlice({
  name: "user",
  initialState: {
    user: listUser,
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getAllUser.fulfilled, (state: any, action: any) => {
        state.user = action.payload;
      })
      .addCase(registerUser.fulfilled, (state: any, action: any) => {
        state.user.push(action.payload);
      })
      .addCase(login.fulfilled, (state: any, action: any) => {
        const index = state.user.findIndex((user: User) => user.id === action.payload.id);
        if (index !== -1) {
          state.user[index] = action.payload;
        }
      })
      .addCase(logout.fulfilled, (state: any, action: any) => {
        const index = state.user.findIndex((user: User) => user.id === action.payload.id);
        if (index !== -1) {
          state.user[index] = action.payload;
        }    
      });
  },
});

export default userReducer.reducer;