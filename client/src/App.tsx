import { Route, Routes } from "react-router-dom";
import "./style/Admin.css";
import "./style/Login.css";
import "./style/user.css";
import "./style/Profile.css";
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
import Profile from "./pages/Profile/Profile";
import InfoUser from "./components/Profile/InfoUser";
import History from "./components/Profile/History";
import BuyProduct from "./components/User/BuyProduct";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product" element={<Product />}></Route>
        <Route path="/product-detail/:id" element={<ProductDetail />}>
          <Route path="buy" element={<BuyProduct />}></Route>
        </Route>
        <Route path="/cart/:id" element={<Cart />}>
          <Route path="buy" element={<BuyProduct />}></Route>
        </Route>
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
        <Route path="/profile/:id" element={<Profile />}>
          <Route index element={<InfoUser />}></Route>
          <Route path="history" element={<History />}></Route>
        </Route>
        <Route path="*" element={<h1>NOT FOUND</h1>}></Route>
      </Routes>
    </div>
  );
}
