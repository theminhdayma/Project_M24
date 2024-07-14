import { useDispatch, useSelector } from "react-redux";
import { User } from "../../interface";
import { useEffect, useState } from "react";
import {
  block,
  getAllAccount,
  searchUserByName,
  unblock,
} from "../../service/user.service";
import { getLocal } from "../../store/reducers/Local";
import FormAddUser from "../From/FormAddUser";
import Swal from "sweetalert2";

export default function ManagerUser() {
  const [name, setName] = useState<string>("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const listAccount: User[] = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);

  useEffect(() => {
    dispatch(getAllAccount());
  }, [dispatch]);

  // Lấy tài khoản đang đăng nhập
  const loggedInUser = getLocal("loggedInUser");

  // Lọc danh sách tài khoản để chỉ lấy những account đăng kh đăng nhập
  const listUser = listAccount.filter(
    (account) => account.id !== loggedInUser.id
  );

  // Filter users based on search term and status
  const filteredUsers = listUser.filter((user) => {
    const matchesName = user.name.toLowerCase().includes(name.toLowerCase());
    const matchesStatus =
      statusFilter === ""
        ? true
        : statusFilter === "active"
        ? user.status === true
        : user.status === false;
    return matchesName && matchesStatus;
  });

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Change users per page
  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUsersPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Thêm User
  const handleShowFromAdd = () => {
    setShowAddForm(true);
  };

  const closeFromAdd = () => {
    setShowAddForm(false);
  };

  const handleBlock = (id: number) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn chặn người dùng này không",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Chặn",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(block(id));
        Swal.fire("", "Đã chặn", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("", "Hủy chặn", "error");
      }
    });
  };

  const handleUnBlock = (id: number) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn bỏ chặn người dùng này không",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Bỏ chặn",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(unblock(id));
        Swal.fire("", "Đã bỏ chặn", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("", "Hủy bỏ chặn", "error");
      }
    });
  };

  const handleSearch = () => {
    dispatch(searchUserByName(name));
  };

  return (
    <>
      <div className="order">
        <div className="head">
          <select
            name="statusFilter"
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Tất cả tài khoản</option>
            <option value="inactive">Tài khoản ngừng hoạt động</option>
            <option value="active">Tài khoản đang hoạt động</option>
          </select>
          <div className="flex justify-between items-center gap-2">
            <input
              className="p-1"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Search by name"
            />
            <i onClick={handleSearch} className="bx bx-search" />
          </div>
          <h3
            className="cursor-pointer border p-3 bg-blue-500 text-white flex justify-center items-center gap-3"
            onClick={handleShowFromAdd}
          >
            <i className="fa-solid fa-circle-plus"></i>
            <span>Thêm người dùng</span>
          </h3>
        </div>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th>Ngày tạo</th>
              <th>Status</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user: User, index: number) => (
              <tr className="cursor-pointer" key={index}>
                <td>{indexOfFirstUser + index + 1}</td> {/* Correct STT */}
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
                <td>{user.created_at}</td>
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
        {/* Pagination */}
        <div className="w-full p-3 flex justify-end items-center gap-2">
          <div>
            <select
              className="border border-gray-800"
              name="usersPerPage"
              id="usersPerPage"
              value={usersPerPage}
              onChange={handlePerPageChange}
            >
              <option value="5">5 bản ghi</option>
              <option value="10">10 bản ghi</option>
              <option value="15">15 bản ghi</option>
              <option value="20">20 bản ghi</option>
            </select>
          </div>
          <div className="flex gap-2">
            {Array.from(
              Array(Math.ceil(filteredUsers.length / usersPerPage)).keys()
            ).map((number, index) => (
              <button
                key={index}
                className={`border border-gray-950 p-1 ${
                  currentPage === number + 1 ? "bg-gray-200" : ""
                }`}
                onClick={() => paginate(number + 1)}
              >
                {number + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      {showAddForm && <FormAddUser closeFromAdd={closeFromAdd} />}
    </>
  );
}
