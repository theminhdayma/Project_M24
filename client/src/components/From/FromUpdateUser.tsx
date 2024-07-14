import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { User } from "../../interface";
import Swal from "sweetalert2";
import { updateUser } from "../../service/user.service";
import { saveLocal } from "../../store/reducers/Local";

interface Props {
  close: () => void;
  user: User | null
}

export default function FromUpdateUser({ close, user }: Props) {
  const [inputValue, setInputValue] = useState({
    name: user?.name,
    address: user?.address,
    numberPhone: user?.numberPhone,
  });
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue.name || !inputValue.address || !inputValue.numberPhone) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const updatedUser = { ...user, ...inputValue };
    
    dispatch(updateUser(updatedUser))
      .unwrap()
      .then(() => {
        Swal.fire("Cập nhật thành công", "", "success");
        saveLocal("loggedInUser", updatedUser);
        close();
      })
      .catch(() => {
        setError("Có lỗi xảy ra khi cập nhật.");
      });
  };
  return (
    <div className="manageUser_modal">
      <form onSubmit={handleSubmit} className="addEmployee__form">
        <div className="closeEmployee_form">
          <i onClick={close} className="fa-solid fa-xmark"></i>
        </div>
        <h4 style={{ fontSize: "24px" }} className="addEmployee_title">
          Cập nhật thông tin người dùng
        </h4>
        {error && <span className="text-red-500">{error}</span>}
        <div style={{ marginTop: "40px" }} className="addEmployee_item">
          <label htmlFor="">Tên tài khoản</label>
          <br />
          <input
            type="text"
            name="name"
            value={inputValue.name}
            onChange={handleChange}
            placeholder="Enter User"
          />
        </div>
        <div className="addEmployee_item">
          <label htmlFor="">Địa chỉ</label>
          <br />
          <input
            type="text"
            name="address"
            value={inputValue.address}
            onChange={handleChange}
            placeholder="Enter Address"
          />
        </div>
        <div className="addEmployee_item">
          <label htmlFor="">Số điện thoại</label>
          <br />
          <input
            type="text"
            name="numberPhone"
            value={inputValue.numberPhone}
            onChange={handleChange}
            placeholder="Enter Phone Number"
          />
        </div>
        <div className="addEmployee_item">
          <button onClick={close} className="closeEmployee_btn">
            Hủy
          </button>
          <button type="submit" className="addEmployee_btn">
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
}
