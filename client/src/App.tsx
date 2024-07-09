import { Route, Routes } from "react-router-dom";
import "./style/Admin.css";
import "./style/Login.css";
import "./style/user.css";
import Admin from "./pages/admin/Admin";
import Login from "./pages/until/Login";
import Register from "./pages/until/Register";
import Home from "./pages/user/Home";
import Product from "./pages/user/Product";
import ProductDetail from "./pages/user/ProductDetail";
import Cart from "./pages/user/Cart";
import ManagerUser from "./pages/admin/ManagerUser";
import ManagerProduct from "./pages/admin/ManagerProduct";
import ManagerRevenue from "./pages/admin/ManagerRevenue";
import ManagerCategory from "./pages/admin/ManagerCategory";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product" element={<Product />}></Route>
        <Route path="/product-detail" element={<ProductDetail />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/admin" element={<Admin />}>
          <Route index element={<ManagerUser />} />
          <Route path="product" element={<ManagerProduct />} />
          <Route path="revenue" element={<ManagerRevenue />} />
          <Route path="category" element={<ManagerCategory />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </div>
  );
}
