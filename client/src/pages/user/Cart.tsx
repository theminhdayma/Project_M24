import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FooterUser from "../../components/User/FooterUser";
import HeaderUser from "../../components/User/HeaderUser";
import { getCart, removeFromCart } from "../../service/cart.service";
import { getLocal } from "../../store/reducers/Local";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state: any) => state.cart.cartDetail);

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  useEffect(() => {
    const userLogin = getLocal("loggedInUser");
    if (!userLogin) {
      navigate("/");
    } else {
      dispatch(getCart({ page: currentPage, limit: productsPerPage }));
    }
  }, [dispatch, currentPage, productsPerPage]);

  // Lấy sản phẩm hiện tại trên trang
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = cart.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Thay đổi trang
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Thay đổi số bản ghi trên mỗi trang
  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProductsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset lại trang về trang đầu tiên khi thay đổi số bản ghi trên mỗi trang
  };

  const handleRemove = async (id: number) => {
    await dispatch(removeFromCart(id));
    dispatch(getCart({ page: currentPage, limit: productsPerPage }));
  };

  const handleSelectProduct = (id: number) => {
    setSelectedProducts(prev => 
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === currentProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(currentProducts.map((item: any) => item.id));
    }
  };

  const handleRemoveSelected = async () => {
    await Promise.all(selectedProducts.map(id => dispatch(removeFromCart(id))));
    setSelectedProducts([]);
    dispatch(getCart({ page: currentPage, limit: productsPerPage }));
  };

  return (
    <>
      <HeaderUser />
      <main>
        <section className="cart">
          <div className="container">
            <h2>Your Shopping Cart</h2>
            <table className="cart-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Tổng tiền</th>
                  <th>Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((item: any) => (
                  <tr key={item.id}>
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedProducts.includes(item.id)} 
                        onChange={() => handleSelectProduct(item.id)} 
                      />
                    </td>
                    <td>
                      <div className="cart-item">
                        <img src={item.image[0]} alt={item.name} />
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td>${item.price}</td>
                    <td>
                      <input
                        type="number"
                        defaultValue={item.quantity}
                        min={1}
                      />
                    </td>
                    <td>${item.price * item.quantity}</td>
                    <td className="h-[100px] flex justify-center items-center gap-4">
                      <button className="remove-btn">Mua hàng</button>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemove(item.id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Phân trang */}
            <div className="w-full p-3 flex justify-end items-center gap-2">
              <div>
                <select
                  className="border border-gray-800"
                  name="productsPerPage"
                  id="productsPerPage"
                  value={productsPerPage}
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
                  Array(Math.ceil(cart.length / productsPerPage)).keys()
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
            <div className="cart-summary">
              <div className="flex justify-center items-center gap-5">
                <div className="flex gap-2">
                  <input 
                    type="checkbox" 
                    onChange={handleSelectAll} 
                    checked={selectedProducts.length === currentProducts.length} 
                  />
                  <label htmlFor="">Chọn tất cả sản phẩm</label>
                </div>
                <button
                  style={{ background: "#ff4081" }}
                  className="w-[60px] border text-white p-2"
                  onClick={handleRemoveSelected}
                >
                  Xóa
                </button>
              </div>
              <div className="flex justify-center items-center gap-9">
                <p className="flex gap-2 text-3xl text-orange-600">
                  <span>Total:</span>
                  {cart.reduce(
                    (acc: number, item: any) =>
                      acc + item.price * item.quantity,
                    0
                  )}{" "}
                  USD
                </p>
                <button className="checkout-btn">Mua hàng</button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterUser />
    </>
  );
}
