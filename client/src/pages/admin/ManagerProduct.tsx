export default function ManagerProduct() {
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
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Lượt mua</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Quần áo</td>
              <td>100</td>
              <td>123</td>
              <td>123</td>
              <td className="flex gap-2">
                <button className="button update">Sửa</button>
                <button className="button delete">Xóa</button>
              </td>
            </tr>
            <tr>
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
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
