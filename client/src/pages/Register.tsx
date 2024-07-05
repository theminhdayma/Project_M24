import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../service/user.service";
import { User } from "../interface";

export default function Register() {
  // State chứa thông tin đăng ký
  const [inputValue, setInputValue] = useState({
    name: "",
    age: 0,
    address: "",
    numberPhone: "",
    email: "",
    password: "",
    image: "",
    role: 1,
    status: false,
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Hàm lấy value từ input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Hàm đăng ký
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Không được bỏ trống trường thông tin nào
    if (
      !inputValue.name ||
      !inputValue.email ||
      !inputValue.password ||
      !inputValue.confirmPassword
    ) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    // Email phải đúng định dạng
    if (!validateEmail(inputValue.email)) {
      setError("Email không đúng định dạng.");
      return;
    }

    // Mật khẩu phải đủ 8 ký tự trở lên
    if (inputValue.password.length < 8) {
      setError("Mật khẩu phải từ 8 ký tự trở lên.");
      return;
    }

    // confirm mật khẩu phải trùng khớp
    if (inputValue.password !== inputValue.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    // Không được sử dụng lại email
    const existingUser = await checkExistingUser(inputValue.email);
    if (existingUser) {
      setError("Email đã được sử dụng.");
      return;
    }

    const { name, age, address, numberPhone, email, password, image, role, status } = inputValue;
    dispatch(register({ name, age, address, numberPhone, email, password, image, role, status }));

    // chuyển hướng sang đăng nhập
    navigate("/login");

    // reset lại state lưu trữ thông tin đăng ký
    setInputValue({
      name: "",
      age: 0,
      address: "",
      numberPhone: "",
      email: "",
      password: "",
      image: "",
      role: 1,
      status: false,
      confirmPassword: "",
    });
    setError("");
  };

  // Email phải đúng định dạng
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Hàm kiểm tra xem email đã tồn tại chưa
  const checkExistingUser = async (email: string) => {
    try {
      const response = await fetch("http://localhost:8080/accounts");
      const data = await response.json();

      if (data && data.length > 0) {
        return data.find((user: User) => user.email === email);
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error checking existing user:", error);
      return null;
    }
  };

  return (
    <div className="body1">
      <div className="login">
        <div className="logo">
          <i className="bx bx-user-circle" />
          <h2>Đăng Ký</h2>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-700">{error}</p>}
          <div className="input_box">
            <span>NameUser</span>
            <div className="icon">
              <i className="bx bxs-user" />
              <input
                type="text"
                name="name"
                value={inputValue.name}
                onChange={handleChange}
                placeholder="Enter User"
              />
            </div>
          </div>

          <div className="input_box">
            <span>Email</span>
            <div className="icon">
              <i className="bx bxs-email" />
              <input
                type="text"
                name="email"
                value={inputValue.email}
                onChange={handleChange}
                placeholder="Enter Email"
              />
            </div>
          </div>
          <div className="input_box">
            <span>Password</span>
            <div className="icon">
              <i className="bx bxs-lock-alt" />
              <input
                type="password"
                name="password"
                value={inputValue.password}
                onChange={handleChange}
                placeholder="Enter Password"
              />
            </div>
          </div>
          <div className="input_box">
            <span>Confirm Password</span>
            <div className="icon">
              <i className="bx bxs-lock-alt" />
              <input
                type="password"
                name="confirmPassword"
                value={inputValue.confirmPassword}
                onChange={handleChange}
                placeholder="Enter Confirm Password"
              />
            </div>
          </div>

          <button type="submit">Đăng Ký</button>
          <p className="signup">Or Sign Up Using</p>
          <div className="social_icon">
            <a href="#" id="facebook">
              <i className="bx bxl-facebook" />
            </a>
            <a href="#" id="twitter">
              <i className="bx bxl-twitter" />
            </a>
            <a href="#" id="google">
              <i className="bx bxl-google" />
            </a>
            <a href="#" id="github">
              <i className="bx bxl-github" />
            </a>
          </div>
          <div className="alreadyAccount">
            <p>
              Already have an account? <Link to="/login">Đăng Nhập</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}