import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Category, ProductType } from "../../interface";
import {
  getAllCategory,
  addProduct,
  getProduct,
} from "../../service/product.service";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

export default function FormAddProduct() {
  const [inputValue, setInputValue] = useState({
    idCategory: -1,
    brand: "",
    name: "",
    total: 0,
    price: 0,
    purchaseCount: 0,
    description: "",
    imageProduct: [],
    created_at: "",
    updated_at: "",
    statusProduct: true,
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const listCategory: Category[] = useSelector(
    (state: any) => state.product.category
  );

  const listProduct: ProductType[] = useSelector(
    (state: any) => state.product.product
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getProduct());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFilesArray = Array.from(e.target.files);
      setImageFiles((prevFiles) => [...prevFiles, ...newFilesArray]);
    }
  };
  
  const handleUploadImages = async () => {
    setLoading(true);
    const promises = imageFiles.map((file) => {
      const storageRef = ref(storage, `products/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise<string>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });
    });

    const result = await Promise.all(promises);
    setLoading(false);
    return result;
  };

  const validateForm = () => {
    const newErrors: string[] = [];
    if (inputValue.idCategory === -1)
      newErrors.push("Loại sản phẩm không được bỏ trống.");
    if (!inputValue.name) newErrors.push("Tên sản phẩm không được bỏ trống.");
    if (inputValue.total <= 0)
      newErrors.push("Số lượng sản phẩm phải lớn hơn 0.");
    if (inputValue.price <= 0) newErrors.push("Giá sản phẩm phải lớn hơn 0.");
    if (!inputValue.description)
      newErrors.push("Mô tả sản phẩm không được bỏ trống.");
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const imageUrls = await handleUploadImages();
      const newProduct = { ...inputValue, imageProduct: imageUrls };
      dispatch(addProduct(newProduct));
      navigate("/admin/product");
      setInputValue({
        idCategory: -1,
        brand: "",
        name: "",
        total: 0,
        price: 0,
        purchaseCount: 0,
        description: "",
        imageProduct: [],
        created_at: "",
        updated_at: "",
        statusProduct: true,
      });
      setImageFiles([]);
      setErrors([]);
      swal("Thêm thành công", "", "success");
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  // Lọc các hãng trùng lặp
  const uniqueBrands = listProduct
    .map((product) => product.brand)
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <div className="products_adminActions_part">
      {/* <button onClick={handleUploadImagess}>jgfsdhbcx,jn</button>
      <img src="0735e1565b79e033290e93f9e08c243e" alt="" /> */}
      <h3 className="create_product">Tạo sản phẩm</h3>
      <form className="allInforproduct_form" onSubmit={handleSubmit}>
        <h4 className="allinfor_product_title">Thông tin chung</h4>
        {errors.length > 0 && (
          <div className="error_messages">
            {errors.map((error, index) => (
              <p key={index} className="error_message">
                {error}
              </p>
            ))}
          </div>
        )}
        <div className="product_item">
          <div className="product_label">
            <h4>Tên sản phẩm</h4>
          </div>
          <input
            type="text"
            name="name"
            className="product_input"
            placeholder="Nhập tên sản phẩm"
            value={inputValue.name}
            onChange={handleChange}
          />
        </div>
        <div className="product_item_flex">
          <div className="product_item">
            <div className="product_label">
              <h4>Loại sản phẩm</h4>
            </div>
            <select
              name="idCategory"
              className="product_input"
              value={inputValue.idCategory}
              onChange={handleChange}
            >
              <option value={-1}>Chọn loại sản phẩm</option>
              {listCategory.map((category: Category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="product_item">
            <div className="product_label">
              <h4>Hãng sản phẩm</h4>
            </div>
            <select
              name="brand"
              className="product_input"
              value={inputValue.brand}
              onChange={handleChange}
            >
              <option value="">Chọn hãng sản phẩm</option>
              {uniqueBrands.map((brand, index) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="product_item_flex">
          <div className="product_item">
            <div className="product_label">
              <h4>Số lượng sản phẩm</h4>
            </div>
            <input
              type="number"
              name="total"
              className="product_input"
              placeholder="Nhập số lượng sản phẩm"
              value={inputValue.total}
              onChange={handleChange}
            />
          </div>
          <div className="product_item">
            <div className="product_label">
              <h4>Giá sản phẩm</h4>
            </div>
            <input
              type="number"
              value={inputValue.price}
              name="price"
              onChange={handleChange}
              className="product_input_number"
              placeholder="Nhập giá sản phẩm"
            />
          </div>
        </div>
        <div>
          <div className="ck_item">
            <div className="product_label">
              <h4>Mô tả sản phẩm</h4>
            </div>
            <CKEditor
              editor={ClassicEditor}
              data={inputValue.description}
              onChange={(event, editor) => {
                const data = editor.getData();
                setInputValue((prev) => ({ ...prev, description: data }));
              }}
            />
          </div>
        </div>
        <div className="imageProduct_form">
          <h4 className="image_product_title">Hình ảnh sản phẩm</h4>
          <div className="uploadImage_part">
            <div className="upload_icon_part">
              <svg
                className="upload_icon"
                viewBox="0 0 23 21"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.5 0A1.5 1.5 0 0120 1.5V12c-.49-.07-1.01-.07-1.5 0V1.5H2v12.65l3.395-3.408a.75.75 0 01.958-.087l.104.087L7.89 12.18l3.687-5.21a.75.75 0 01.96-.086l.103.087 3.391 3.405c.81.813.433 2.28-.398 3.07A5.235 5.235 0 0014.053 18H2a1.5 1.5 0 01-1.5-1.5v-15A1.5 1.5 0 012 0h16.5z"></path>
                <path d="M6.5 10.5a1 1 0 011-1h8a1 1 0 110 2h-8a1 1 0 01-1-1z"></path>
              </svg>
            </div>
            <label htmlFor="fileinput" className="uploadImage_content">
              Thêm hình ảnh
            </label>
            <input
              type="file"
              id="fileinput"
              className="upload_input"
              multiple
              onChange={handleImageChange}
            />
          </div>
          <div className="image_list">
            {imageFiles.map((file, index) => (
              <div className="image_item" key={index}>
                <img src={URL.createObjectURL(file)} alt="product" />
              </div>
            ))}
          </div>
        </div>
        <div className="footer_addProducts">
          <button type="submit" className="submit_form" disabled={loading}>
            {loading ? "Đang tải..." : "Tạo sản phẩm"}
          </button>
        </div>
      </form>
    </div>
  );
}
