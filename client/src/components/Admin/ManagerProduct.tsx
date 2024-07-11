import { useDispatch, useSelector } from "react-redux";
import { ProductType } from "../../interface";
import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../../service/product.service";
import { useNavigate } from "react-router-dom";

export default function ManagerProduct() {
  const listProduct: ProductType[] = useSelector(
    (state: any) => state.product.product
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const handleClick = () => {
    navigate("/addProduct");
  };

  const handleEdit = (productId: number) => {
    navigate(`/updateProduct/${productId}`);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  return (
    <>
      <div className="order">
        <div className="head">
          <h3
            className="cursor-pointer border p-3 bg-blue-500 text-white flex justify-center items-center gap-3"
            onClick={handleClick}
          >
            <i className="fa-solid fa-circle-plus"></i>
            <span>Thêm sản phẩm</span>
          </h3>
          <i className="bx bx-search" />
          <i className="bx bx-filter" />
        </div>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên sản phẩm</th>
              <th>Hãng</th>
              <th>Số lượng</th>
              <th>Giá(USD)</th>
              <th>Lượt mua</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {listProduct.map((product: ProductType, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.total}</td>
                <td>{product.price}</td>
                <td>{product.purchaseCount}</td>
                <td className="flex gap-2">
                  <button
                    className="button update"
                    onClick={() => handleEdit(product.id)}
                  >
                    Sửa
                  </button>
                  <button
                    className="button delete"
                    onClick={() => handleDelete(product.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
