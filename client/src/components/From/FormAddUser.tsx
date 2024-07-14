import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { User } from "../../interface";
import { register } from "../../service/user.service";

interface Props {
  closeFromAdd: () => void;
}

export default function FormAddUser({ closeFromAdd }: Props) {
  const [inputValue, setInputValue] = useState({
    name: "",
    age: 0,
    address: "chưa có",
    numberPhone: "chưa có",
    email: "",
    password: "",
    image: "",
    role: 1,
    status: true,
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch();

  // Hàm lấy value từ input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

    const {
      name,
      age,
      address,
      numberPhone,
      email,
      password,
      image,
      role,
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
        status,
      })
    );

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
      status: true,
      confirmPassword: "",
    });
    setError("");
    closeFromAdd();
    swal("Thêm thành công", "", "success");
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
    <>
      <div className="manageUser_modal">
        <form onSubmit={handleSubmit} className="addEmployee__form">
          <div className="closeEmployee_form">
            <i onClick={closeFromAdd} className="fa-solid fa-xmark"></i>
          </div>
          <h4 style={{fontSize: "24px"}} className="addEmployee_title">Thêm người dùng</h4>
          {error && <span className="text-red-500">{error}</span>}
          <div style={{marginTop: "40px"}} className="addEmployee_item">
            <label htmlFor="">Tên tài khoản</label>
            <br />
            <input
              type="text"
              name="name"
              value={inputValue.name}
              onChange={handleChange}
              placeholder="Enter User"
            />
            {/* {errors.nameAccount&&<div  className='message_error'>{errors.nameAccount}</div>} */}
          </div>
          <div className="addEmployee_item">
            <label htmlFor="">Email</label>
            <br />
            <input
              type="text"
              name="email"
              value={inputValue.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />
            {/* {errors.email&&<div  className='message_error'>{errors.email}</div>} */}
          </div>
          <div className="addEmployee_item">
            <label htmlFor="">Mật khẩu</label>
            <br />
            <input
              type="password"
              name="password"
              value={inputValue.password}
              onChange={handleChange}
              placeholder="Enter Password"
            />
            {/* {errors.password&&<div  className='message_error'>{errors.password}</div>} */}
          </div>
          <div className="addEmployee_item">
            <label htmlFor="">Xác nhận mật khẩu</label>
            <br />
            <input
              type="password"
              name="confirmPassword"
              value={inputValue.confirmPassword}
              onChange={handleChange}
              placeholder="Enter Confirm Password"
            />
            {/* {errors.authPassword&&<div className='message_error'>{errors.authPassword}</div>} */}
          </div>
          <div className="addEmployee_item">
            <button onClick={closeFromAdd} className="closeEmployee_btn">
              Hủy
            </button>
            <button className="addEmployee_btn">Thêm</button>
          </div>
        </form>
      </div>
    </>
  );
}
