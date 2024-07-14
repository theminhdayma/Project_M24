import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../../service/product.service";
import { Category } from "../../interface";

interface Props {
  closeFromAdd: () => void;
}

export default function FormAddCategory({ closeFromAdd }: Props) {
  const [inputValue, setInputValue] = useState({
    name: "",
    description: "",
    products: [],
    created_at: "",
    status: true,
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

    // Không được bỏ trống trường thông tin nào
    if (!inputValue.name || !inputValue.description) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    // Không được sử dụng lại tên loại sản phẩm
    const check = await checkNameCategory(inputValue.name);
    if (check) {
      setError("Tên sản phẩm đã có");
      return;
    }

    await dispatch(addCategory(inputValue));

    //reset lại state lưu trữ thông tin
    setInputValue({
      name: "",
      description: "",
      products: [],
      created_at: "",
      status: true,
    });
    setError("");
    closeFromAdd();
    swal("Thêm thành công", "", "success");
  };

  // Hàm check xem loại sản phẩm đã tồn tại chưa
  const checkNameCategory = async (name: string) => {
    try {
      const response = await fetch("http://localhost:8080/category");
      const data = await response.json();

      if (data && data.length > 0) {
        return data.find((category: Category) => category.name === name);
      } else {
        return null;
      }
    } catch (error) {
      console.error("Lỗi: ", error);
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
          <h4 style={{ fontSize: "24px" }} className="addEmployee_title">
            Thêm loại hàng
          </h4>
          {error && <span className="text-red-500">{error}</span>}
          <div style={{ marginTop: "40px" }} className="addEmployee_item">
            <label htmlFor="">Tên loại mặt hàng</label>
            <br />
            <input
              type="text"
              name="name"
              value={inputValue.name}
              onChange={handleChange}
              placeholder="Tên loại sản phẩm"
            />
          </div>
          <div style={{ marginTop: "40px" }} className="addEmployee_item">
            <label htmlFor="">Mô tả loại sản phẩm</label>
            <br />
            <input
              type="text"
              name="description"
              value={inputValue.description}
              onChange={handleChange}
              placeholder="Mô tả loại sản phẩm"
            />
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
