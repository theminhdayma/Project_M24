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
import ManagerUser from "./components/Admin/ManagerUser";
import ManagerProduct from "./components/Admin/ManagerProduct";
import ManagerRevenue from "./components/Admin/ManagerRevenue";
import ManagerCategory from "./components/Admin/ManagerCategory";
import FormAddProduct from "./components/From/FromAddProduct";
import FromUpdateProduct from "./components/From/FromUpdateProduct";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product" element={<Product />}></Route>
        <Route path="/product-detail/:id" element={<ProductDetail />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/admin" element={<Admin />}>
          <Route index element={<ManagerUser />} />
          <Route path="product" element={<ManagerProduct />}></Route>
          <Route path="revenue" element={<ManagerRevenue />}></Route>
          <Route path="category" element={<ManagerCategory />}></Route>
        </Route>
        <Route path="/addProduct" element={<FormAddProduct />}></Route>
        <Route
          path="/updateProduct/:id"
          element={<FromUpdateProduct />}
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </div>
  );
}
