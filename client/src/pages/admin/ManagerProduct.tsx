import { useDispatch, useSelector } from "react-redux";
import { ProductType } from "../../interface";
import { useEffect, useState } from "react";
import { getProducts } from "../../service/product.service";
import FormAddProduct from "../../components/From/FromAddProduct";

export default function ManagerProduct() {
  const [showFromAddProduct, setShowFromAddProduct] = useState<boolean>(false);
  const listProduct: ProductType[] = useSelector(
    (state: any) => state.product.product
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const handleClick = () => {
    setShowFromAddProduct(true);
  };

  const closeFrom = () => {
    setShowFromAddProduct(false);
  };
  return (
    <>
      <div className="order">
        <div className="head">
          <h3 className="cursor-pointer" onClick={handleClick}>
            Thêm sản phẩm
          </h3>
          <i className="bx bx-search" />
          <i className="bx bx-filter" />
        </div>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th className="w-[700px] pr-2 pl-2">Tên sản phẩm</th>
              <th>Loại hàng</th>
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
                <td>
                  <span className="w-[700px] pl-6">{product.description}</span>
                </td>
                <td>{product.nameProduct}</td>
                <td>{product.total}</td>
                <td>{product.price}</td>
                <td>{product.purchaseCount}</td>
                <td className="flex gap-2">
                  <button className="button update">Sửa</button>
                  <button className="button delete">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showFromAddProduct && <FormAddProduct closeFrom={closeFrom} />}
    </>
  );
}
