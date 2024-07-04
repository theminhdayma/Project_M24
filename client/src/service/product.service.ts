import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts: any = createAsyncThunk(
    "product/getProducts",
    async () => {
        const res = await axios.get("http://localhost:8080/products");
        return res.data
    }
)