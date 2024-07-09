import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../service/product.service";

interface Props {
  closeFrom: () => void
}

export default function FormAddProduct({closeFrom}: Props) {
  const [inputValue, setInputValue] = useState({
    name: "",
    quantity: 0,
    price: 0,
    image: "",
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setInputValue((prev) => ({
          ...prev,
          image: reader.result as string,
        }));
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue.name || !inputValue.quantity || !inputValue.price) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    dispatch(addProduct(inputValue));
    setInputValue({
      name: "",
      quantity: 0,
      price: 0,
      image: "",
    });
    setError("");
  };

  return (
    <div className="manageUser_modal">
      <form onSubmit={handleSubmit} className="addEmployee__form">
        <div onClick={closeFrom} className="closeEmployee_form">
          <i className="fa-solid fa-xmark"></i>
        </div>
        <h4 className="addEmployee_title">Thêm sản phẩm</h4>
        {error && <span className="text-red-500">{error}</span>}
        <div className="addEmployee_item">
          <label htmlFor="name">Tên sản phẩm</label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            value={inputValue.name}
            onChange={handleChange}
            placeholder="Tên sản phẩm"
          />
        </div>
        <div className="addEmployee_item">
          <label htmlFor="quantity">Số lượng</label>
          <br />
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={inputValue.quantity}
            onChange={handleChange}
            placeholder="Số lượng sản phẩm"
          />
        </div>
        <div className="addEmployee_item">
          <label htmlFor="price">Giá sản phẩm</label>
          <br />
          <input
            type="number"
            id="price"
            name="price"
            value={inputValue.price}
            onChange={handleChange}
            placeholder="Giá sản phẩm"
          />
        </div>
        <div className="addEmployee_item">
          <label htmlFor="image">Ảnh sản phẩm</label>
          <br />
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
          />
        </div>
        {inputValue.image && (
          <div className="addEmployee_item">
            <img src={inputValue.image} alt="Product" style={{ maxWidth: "100px", maxHeight: "100px" }} />
          </div>
        )}
        <div className="addEmployee_item">
          <button onClick={closeFrom} type="button" className="closeEmployee_btn">
            Hủy
          </button>
          <button type="submit" className="addEmployee_btn">
            Thêm
          </button>
        </div>
      </form>
    </div>
  );
}
