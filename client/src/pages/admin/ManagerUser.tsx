import { useDispatch, useSelector } from "react-redux";
import { User } from "../../interface";
import { useEffect } from "react";
import { getAllAccount } from "../../service/user.service";

export default function ManagerUser() {
  const listAccount: User[] = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllAccount());
  }, [dispatch]);

  // Lọc danh sách tài khoản để chỉ lấy những account có role bằng 1
  const listUser = listAccount.filter((account) => account.role === 1);

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
              <th>Địa chỉ</th>
              <th>Status</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {listUser.map((user: User, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img src={user.image} alt={user.name}/>
                  <p>{user.name}</p>
                </td>
                <td>{user.numberPhone}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>
                  <span
                    style={{ backgroundColor: "red" }}
                    className="status completed"
                  >
                    Ngừng hoạt động
                  </span>
                </td>
                <td className="flex gap-2">
                  <button className="button block">Chặn</button>
                  <button className="button update">Sửa</button>
                  <button className="button delete">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
