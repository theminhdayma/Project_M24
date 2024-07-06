import { useDispatch, useSelector } from "react-redux";
import { ProductType } from "../../interface";
import { useEffect } from "react";
import { getProducts } from "../../service/product.service";

export default function ManagerProduct() {
  const listProduct: ProductType[] = useSelector(
    (state: any) => state.product.product
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  console.log(listProduct);
  return (
    <>
      <div className="order">
        <div className="head">
          <h3>Quản lý sản phẩm</h3>
          <i className="bx bx-search" />
          <i className="bx bx-filter" />
        </div>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th className="w-[700px] pr-2 pl-2">Tên sản phẩm</th>
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
                <td>{product.total}</td>
                <td>{product.price}</td>
                <td>{product.purchaseCount}</td>
                <td className="flex gap-2">
                  <button className="button update">Sửa</button>
                  <button className="button delete">Xóa</button>
                </td>
              </tr>
            ))}
            {/* <tr>
              <td>2</td>
              <td>Quần áo</td>
              <td>200</td>
              <td>123</td>
              <td>123</td>
              <td className="flex gap-2">
                <button className="button update">Sửa</button>
                <button className="button delete">Xóa</button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Quần áo</td>
              <td>111</td>
              <td>123</td>
              <td>123</td>
              <td className="flex gap-2">
                <button className="button update">Sửa</button>
                <button className="button delete">Xóa</button>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>Quần áo</td>
              <td>222</td>
              <td>123</td>
              <td>123</td>
              <td className="flex gap-2">
                <button className="button update">Sửa</button>
                <button className="button delete">Xóa</button>
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>Quần áo</td>
              <td>121</td>
              <td>123</td>
              <td>123</td>
              <td className="flex gap-2">
                <button className="button update">Sửa</button>
                <button className="button delete">Xóa</button>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </>
  );
}
