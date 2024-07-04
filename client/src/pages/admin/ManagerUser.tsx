import React from "react";

export default function ManagerUser() {
  return (
    <>
      <div className="order">
        <div className="head">
          <h3>Quản lý người dùng</h3>
          <i className="bx bx-search" />
          <i className="bx bx-filter" />
        </div>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th>Ngày thêm</th>
              <th>Status</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <img src="https://firebasestorage.googleapis.com/v0/b/projectreact-dd427.appspot.com/o/7b42ef2c-5724-4e1c-abe2-a4017fc4ec1a.jpg?alt=media&token=fce0967e-11f4-4d4e-9dfd-cdc4e91759e9" />
                <p>Thế Minh</p>
              </td>
              <td>0364577211</td>
              <td>theminh2005z@gmail.com</td>
              <td>01-10-2021</td>
              <td>
                <span style={{backgroundColor: "red"}} className="status completed">Ngừng hoạt động</span>
              </td>
              <td className="flex gap-2">
                <button className="button block">Chặn</button>
                <button className="button update">Sửa</button>
                <button className="button delete">Xóa</button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                <img src="https://firebasestorage.googleapis.com/v0/b/projectreact-dd427.appspot.com/o/7b42ef2c-5724-4e1c-abe2-a4017fc4ec1a.jpg?alt=media&token=fce0967e-11f4-4d4e-9dfd-cdc4e91759e9" />
                <p>Thế Minh</p>
              </td>
              <td>0364577211</td>
              <td>theminh2005z@gmail.com</td>
              <td>01-10-2021</td>
              <td>
                <span style={{backgroundColor: "green"}} className="status pending">Đang hoạt động</span>
              </td>
              <td className="flex gap-2">
                <button className="button block">Chặn</button>
                <button className="button update">Sửa</button>
                <button className="button delete">Xóa</button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>
                <img src="https://firebasestorage.googleapis.com/v0/b/projectreact-dd427.appspot.com/o/7b42ef2c-5724-4e1c-abe2-a4017fc4ec1a.jpg?alt=media&token=fce0967e-11f4-4d4e-9dfd-cdc4e91759e9" />
                <p>Thế Minh</p>
              </td>
              <td>0364577211</td>
              <td>theminh2005z@gmail.com</td>
              <td>01-10-2021</td>
              <td>
                <span style={{backgroundColor: "green"}} className="status process">Đang hoạt động</span>
              </td>
              <td className="flex gap-2">
                <button className="button block">Chặn</button>
                <button className="button update">Sửa</button>
                <button className="button delete">Xóa</button>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>
                <img src="https://firebasestorage.googleapis.com/v0/b/projectreact-dd427.appspot.com/o/7b42ef2c-5724-4e1c-abe2-a4017fc4ec1a.jpg?alt=media&token=fce0967e-11f4-4d4e-9dfd-cdc4e91759e9" />
                <p>Thế Minh</p>
              </td>
              <td>0364577211</td>
              <td>theminh2005z@gmail.com</td>
              <td>01-10-2021</td>
              <td>
                <span style={{backgroundColor: "red"}} className="status pending">Ngừng hoạt động</span>
              </td>
              <td className="flex gap-2">
                <button className="button block">Chặn</button>
                <button className="button update">Sửa</button>
                <button className="button delete">Xóa</button>
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>
                <img src="https://firebasestorage.googleapis.com/v0/b/projectreact-dd427.appspot.com/o/7b42ef2c-5724-4e1c-abe2-a4017fc4ec1a.jpg?alt=media&token=fce0967e-11f4-4d4e-9dfd-cdc4e91759e9" />
                <p>Thế Minh</p>
              </td>
              <td>0364577211</td>
              <td>theminh2005z@gmail.com</td>
              <td>01-10-2021</td>
              <td>
                <span style={{backgroundColor: "red"}} className="status completed">Ngừng hoạt động</span>
              </td>
              <td className="flex gap-2">
                <button className="button block">Chặn</button>
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
