import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../service/user.service";
import { User } from "../../interface";
export default function Register() {
  const [checkEmail, setCheckEmail] = useState<boolean>(false);
  const [checkUseEmail, setCheckUseEmail] = useState<boolean>(false);
  const [checkHollow, setCheckHollow] = useState<boolean>(false);
  const [checkPassword, setCheckPassword] = useState<boolean>(false);
  const [checkComfimPassword, setCheckComfimPassword] =
    useState<boolean>(false);

  // State chứa thông tin đăng ký
  const [inputValue, setInputValue] = useState({
    name: "",
    age: 0,
    address: "chưa có",
    numberPhone: "chưa có",
    email: "",
    password: "",
    image: "",
    role: 1,
    created_at: "",
    updated_at: "",
    status: true,
    confirmPassword: "",
  });

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
      setCheckHollow(true);
      return;
    } else {
      setCheckHollow(false);
    }

    // Email phải đúng định dạng
    if (!validateEmail(inputValue.email)) {
      setCheckEmail(true);
      return;
    } else {
      setCheckEmail(false);
    }

    // Mật khẩu phải đủ 8 ký tự trở lên
    if (inputValue.password.length < 8) {
      setCheckPassword(true);
      return;
    } else {
      setCheckPassword(false);
    }

    // confirm mật khẩu phải trùng khớp
    if (inputValue.password !== inputValue.confirmPassword) {
      setCheckComfimPassword(true);
      return;
    } else {
      setCheckComfimPassword(false);
    }

    // Không được sử dụng lại email
    const existingUser = await checkExistingUser(inputValue.email);
    if (existingUser) {
      setCheckUseEmail(true);
      return;
    } else {
      setCheckUseEmail(false);
    }

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
    } = inputValue;
    dispatch(
      register({
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
      })
    );

    // chuyển hướng sang đăng nhập
    navigate("/login");

    // reset lại state lưu trữ thông tin đăng ký
    setInputValue({
      name: "",
      age: 0,
      address: "chưa có",
      numberPhone: "chưa có",
      email: "",
      password: "",
      image: "",
      role: 1,
      created_at: "",
      updated_at: "",
      status: true,
      confirmPassword: "",
    });
    setCheckComfimPassword(false);
    setCheckEmail(false);
    setCheckHollow(false);
    setCheckPassword(false);
    setCheckUseEmail(false);
    swal("Đăng ký thành công", "", "success");
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
      console.error("Lỗi:", error);
      return null;
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <main>
        <div className="container py-10">
          <div className="mx-auto max-w-md card p-6">
            <div className="flex items-center gap-2 mb-4">
              <i className="bx bx-user-circle text-2xl" />
              <h2 className="text-xl font-display">Đăng Ký</h2>
            </div>
            {checkHollow && (
              <p className="text-red-700 mb-2">Vui lòng điền đầy đủ thông tin</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="flex flex-col gap-2">
                <span className="text-sm text-ink-700">NameUser</span>
                <div className="flex items-center gap-2 rounded-md border border-ink-300 px-3 py-2 focus-within:ring-2 focus-within:ring-brand-400">
                  <i className="bx bxs-user" />
                  <input
                    className="flex-1 outline-none"
                    type="text"
                    name="name"
                    value={inputValue.name}
                    onChange={handleChange}
                    placeholder="Enter User"
                  />
                </div>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm text-ink-700">Email</span>
                <div className="flex items-center gap-2 rounded-md border border-ink-300 px-3 py-2 focus-within:ring-2 focus-within:ring-brand-400">
                  <i className="bx bxs-email" />
                  <input
                    className="flex-1 outline-none"
                    type="text"
                    name="email"
                    value={inputValue.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                  />
                </div>
                {checkUseEmail && (
                  <p className="text-red-700 text-sm">Email đã được sử dụng</p>
                )}
                {checkEmail && (
                  <p className="text-red-700 text-sm">Email không đúng định dạng</p>
                )}
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm text-ink-700">Password</span>
                <div className="flex items-center gap-2 rounded-md border border-ink-300 px-3 py-2 focus-within:ring-2 focus-within:ring-brand-400">
                  <i className="bx bxs-lock-alt" />
                  <input
                    className="flex-1 outline-none"
                    type="password"
                    name="password"
                    value={inputValue.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                  />
                </div>
                {checkPassword && (
                  <p className="text-red-700 text-sm">Mật khẩu phải đủ 8 ký tự trở lên</p>
                )}
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm text-ink-700">Confirm Password</span>
                <div className="flex items-center gap-2 rounded-md border border-ink-300 px-3 py-2 focus-within:ring-2 focus-within:ring-brand-400">
                  <i className="bx bxs-lock-alt" />
                  <input
                    className="flex-1 outline-none"
                    type="password"
                    name="confirmPassword"
                    value={inputValue.confirmPassword}
                    onChange={handleChange}
                    placeholder="Enter Confirm Password"
                  />
                </div>
                {checkComfimPassword && (
                  <p className="text-red-700 text-sm">Xác nhận mật khẩu không chính xác</p>
                )}
              </label>

              <button type="submit" className="btn-primary w-full py-2">Đăng Ký</button>
              <p className="text-center text-sm text-ink-600">Hoặc đăng ký bằng</p>
              <div className="flex justify-center items-center gap-3 text-ink-700">
                <a href="#" id="facebook"><i className="bx bxl-facebook text-xl" /></a>
                <a href="#" id="twitter"><i className="bx bxl-twitter text-xl" /></a>
                <a href="#" id="google"><i className="bx bxl-google text-xl" /></a>
                <a href="#" id="github"><i className="bx bxl-github text-xl" /></a>
              </div>
              <div className="text-center text-sm">
                <p>
                  Already have an account? <Link className="text-brand-700" to="/login">Đăng Nhập</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
