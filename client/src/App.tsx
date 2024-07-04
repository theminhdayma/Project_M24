import { Route, Routes } from "react-router-dom";
import "./style/user.css";
import "./style/Admin.css";
import "./style/Login.css";
import Admin from "./pages/admin/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/user/Home";
import Product from "./pages/user/Product";
import ProductDetail from "./pages/user/ProductDetail";
import Cart from "./pages/user/Cart";
import ManagerUser from "./pages/admin/ManagerUser";
import ManagerProduct from "./pages/admin/ManagerProduct";
import ManagerRevenue from "./pages/admin/ManagerRevenue";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product" element={<Product />}></Route>
        <Route path="/product-detail" element={<ProductDetail />}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin" element={<ManagerUser/>}></Route>
          <Route path="/admin/product" element={<ManagerProduct/>}></Route>
          <Route path="/admin/revenue" element={<ManagerRevenue/>}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </div>
  );
}
