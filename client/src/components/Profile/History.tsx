import React, { useEffect, useState } from "react";
import { getLocal } from "../../store/reducers/Local";
import { useDispatch, useSelector } from "react-redux";
import { getHistory, loadCart } from "../../service/cart.service";
import { ProductType, User } from "../../interface";
import { getProduct } from "../../service/product.service";
import { getAllAccount } from "../../service/user.service";

export default function History() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(5);
  const dispatch = useDispatch();
  const listHistory: History[] = useSelector((state: any) => state.cart.history);
  const historyUser = listHistory.filter((history: any) => history.idUser === loggedInUser?.id);

  const listProduct: ProductType[] = useSelector((state: any) => state.product.product);
  const listAccount: User[] = useSelector((state: any) => state.user.user);

  useEffect(() => {
    const logged: User = getLocal("loggedInUser");
    setLoggedInUser(logged);
    dispatch(loadCart());
    dispatch(getAllAccount());
    dispatch(getProduct());
    dispatch(getHistory({ page: currentPage, limit: ordersPerPage }));
  }, [dispatch, currentPage, ordersPerPage]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrdersPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = historyUser.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <div className="history-container">
      <h1>Lịch sử mua hàng</h1>
      {historyUser.length === 0 ? (
        <p>Bạn chưa có đơn hàng nào.</p>
      ) : (
        <div>
          <table className="history-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Sản phẩm</th>
                <th>Số lượng</th>
                <th>Tổng tiền</th>
                <th>Ngày mua</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((item: any, index: number) => {
                const product = listProduct.find((pro: ProductType) => pro.id === item.idProduct);
                const buyer = listAccount.find((acc: User) => acc.id === item.idUser);
                if (!product || !buyer) return null;
                const stt = indexOfFirstOrder + index + 1;
                return (
                  <tr key={item.id}>
                    <td>{stt}</td>
                    <td>
                      <img
                        src={product.imageProduct[0]}
                        alt={product.imageProduct[0]}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                      <p>{product.name}</p>
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.quantity * product.price}</td>
                    <td>{item.created_at}</td>
                    <td>
                      <button className="border bg-red-600 text-white p-2">
                        xem chi tiết
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="w-full p-3 flex justify-end items-center gap-2">
            <div>
              <select
                className="border border-gray-800"
                name="ordersPerPage"
                id="ordersPerPage"
                value={ordersPerPage}
                onChange={handlePerPageChange}
              >
                <option value="5">5 orders</option>
                <option value="10">10 orders</option>
                <option value="15">15 orders</option>
                <option value="20">20 orders</option>
              </select>
            </div>
            <div className="flex gap-2">
              {Array.from(
                Array(Math.ceil(historyUser.length / ordersPerPage)).keys()
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
      )}
    </div>
  );
}
