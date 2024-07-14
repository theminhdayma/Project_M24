import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHistory, loadCart } from "../../service/cart.service";
import { CartDetail, ProductType, User } from "../../interface";
import { getProduct } from "../../service/product.service";
import { getAllAccount } from "../../service/user.service";

export default function ManagerRevenue() {
  const dispatch = useDispatch();
  const listHistory = useSelector((state: any) => state.cart.history);
  const listProduct: ProductType[] = useSelector(
    (state: any) => state.product.product
  );
  const listAccount: User[] = useSelector((state: any) => state.user.user);
  const listCart: CartDetail[] = useSelector(
    (state: any) => state.cart.cartDetail
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(5);
  const [searchName, setSearchName] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
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

  const handleSearchNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
    setCurrentPage(1); // Reset page when search name changes
  };

  const handleFilterTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
    setCurrentPage(1); // Reset page when filter type changes
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  const combinedOrders = [
    ...listHistory.map((historyItem: any) => ({
      ...historyItem,
      inCart: false, // Flag for history items
    })),
    ...listCart.map((cartItem: any) => ({
      ...cartItem,
      inCart: true, // Flag for cart items
    })),
  ];

  const filteredOrders = combinedOrders.filter((item: any) => {
    const product = listProduct.find(
      (pro: ProductType) => pro.id === item.idProduct
    );
    const buyer = listAccount.find((acc: User) => acc.id === item.idUser);

    if (!product || !buyer) return false;

    // Apply filter by type (in cart or purchased)
    if (filterType === "cart" && !item.inCart) return false;
    if (filterType === "purchased" && item.inCart) return false;

    // Search by buyer name
    if (
      searchName &&
      !buyer.name.toLowerCase().includes(searchName.toLowerCase())
    )
      return false;

    return true;
  });

  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  return (
    <>
      <div className="order">
        <div className="head">
          <h3>Quản Lý đơn Hàng</h3>
          <div className="flex justify-center items-center gap-5">
            <input
              type="text"
              placeholder="Tên người dùng"
              value={searchName}
              onChange={handleSearchNameChange}
            />
            <i className="bx bx-search" />
          </div>
          <select value={filterType} onChange={handleFilterTypeChange}>
            <option value="">Tất cả</option>
            <option value="cart">Trong giỏ hàng</option>
            <option value="purchased">Đã mua</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Người mua</th>
              <th>Sản phẩm</th>
              <th>Số lượng</th>
              <th>Giá (USD)</th>
              <th>Ngày mua</th>
              <th>Trạng thái</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((item: any, index: number) => {
              const product = listProduct.find(
                (pro: ProductType) => pro.id === item.idProduct
              );
              const buyer = listAccount.find(
                (acc: User) => acc.id === item.idUser
              );
              if (!product || !buyer) return null;
              const stt = indexOfFirstOrder + index + 1;
              const status = item.inCart === true ? "Trong giỏ hàng" : "Đã mua";
              return (
                <tr key={item.id}>
                  <td>{stt}</td>
                  <td>
                    <p>{buyer.name}</p>
                  </td>
                  <td>
                    <img
                      src={product.imageProduct[0]}
                      alt={product.imageProduct[0]}
                    />
                    <p>{product.name}</p>
                  </td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.created_at}</td>
                  <td>{status}</td>
                  <td>
                    {item.inCart === true ? (
                      ""
                    ) : (
                      <button className="border bg-red-600 text-white p-2">
                        xem chi tiết
                      </button>
                    )}
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
              Array(Math.ceil(filteredOrders.length / ordersPerPage)).keys()
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
    </>
  );
}
