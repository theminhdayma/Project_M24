import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Category } from "../../interface";
import { updateCategory } from "../../service/product.service";

interface Props {
  closeFromUpdate: () => void;
  category: Category;
}

export default function FormUpdateCategory({ closeFromUpdate, category }: Props) {
  const [inputValue, setInputValue] = useState({
    id: category.id,
    name: category.name,
    description: category.description,
    products: category.products,
    created_at: category.created_at,
    status: category.status,
  });
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch();

  useEffect(() => {
    setInputValue({
      id: category.id,
      name: category.name,
      description: category.description,
      products: category.products,
      created_at: category.created_at,
      status: category.status,
    });
  }, [category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue.name || !inputValue.description) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    dispatch(updateCategory(inputValue));
    setError("");
    closeFromUpdate();
    swal("Chỉnh sửa thành công", "", "success");
  };

  return (
    <>
      <div className="manageUser_modal">
        <form onSubmit={handleSubmit} className="addEmployee__form">
          <div className="closeEmployee_form">
            <i onClick={closeFromUpdate} className="fa-solid fa-xmark"></i>
          </div>
          <h4 style={{ fontSize: "24px" }} className="addEmployee_title">
            Sửa loại hàng
          </h4>
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
            <button onClick={closeFromUpdate} className="closeEmployee_btn">
              Hủy
            </button>
            <button className="addEmployee_btn">Sửa</button>
          </div>
        </form>
      </div>
    </>
  );
}
