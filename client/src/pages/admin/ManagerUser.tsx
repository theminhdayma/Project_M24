import { useDispatch, useSelector } from "react-redux";
import { User } from "../../interface";
import { useEffect, useState } from "react";
import { block, getAllAccount, unblock } from "../../service/user.service";
import { getLocal } from "../../store/reducers/Local";
import FormAddUser from "../../components/From/FormAddUser";



export default function ManagerUser() {
  const [showAddForm, setShowAddForm] = useState(false);
  const listAccount: User[] = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllAccount());
  }, [dispatch]);

  // Lấy tài khoản đang đăng nhập
  const loggedInUser = getLocal("loggedInUser");

  // Lọc danh sách tài khoản để chỉ lấy những account đăng kh đăng nhập
  const listUser = listAccount.filter(
    (account) => account.id !== loggedInUser.id
  );

  // Thêm User
  const handleShowFromAdd = () => {
    setShowAddForm(true);
  };

  const closeFromAdd = () => {
    setShowAddForm(false)
  }

  const handleBlock = (id: number) => {
    dispatch(block(id));
  };

  const handleUnBlock = (id: number) => {
    dispatch(unblock(id));
  };
  return (
    <>
      <div className="order">
        <div className="head">
          <h3 onClick={handleShowFromAdd}>Thêm người dùng</h3>
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
                  {user.image === "" ? (
                    <img
                      className="w-9 h-9 object-cover rounded-full"
                      src="https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
                      alt={user.name}
                    />
                  ) : (
                    <img
                      className="w-9 h-9 object-cover rounded-full"
                      src={user.image}
                      alt={user.name}
                    />
                  )}
                  <p>{user.name}</p>
                </td>
                <td>{user.numberPhone}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>
                  {user.role === 0 ? (
                    <span style={{ marginLeft: "20px" }}>ADMIN</span>
                  ) : (
                    <div>
                      {user.status === true ? (
                        <span
                          style={{ backgroundColor: "green" }}
                          className="status completed"
                        >
                          Đang hoạt động
                        </span>
                      ) : (
                        <span
                          style={{ backgroundColor: "red" }}
                          className="status completed"
                        >
                          Ngừng hoạt động
                        </span>
                      )}
                    </div>
                  )}
                </td>
                <td>
                  {user.role === 0 ? (
                    <span>Không có quyền</span>
                  ) : (
                    <div>
                      {user.status === true ? (
                        <button
                          onClick={() => handleBlock(user.id)}
                          className="button block"
                        >
                          Chặn
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUnBlock(user.id)}
                          className="button unblock"
                        >
                          Bỏ chặn
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAddForm && <FormAddUser closeFromAdd = {closeFromAdd}/>}
    </>
  );
}
