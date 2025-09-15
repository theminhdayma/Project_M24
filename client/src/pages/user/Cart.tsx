import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderUser from "../../components/User/HeaderUser";
import FooterUser from "../../components/User/FooterUser";
import {
  getCart,
  removeFromCart,
  buyProduct,
  addHistory,
  updatedQuantityCart,
} from "../../service/cart.service";
import { getLocal } from "../../store/reducers/Local";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CartDetail, ProductType, User } from "../../interface";
import { getProductById } from "../../service/product.service";
import swal from "sweetalert";
import Swal from "sweetalert2";

export default function Cart() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state: any) => state.cart.cartDetail);
  const listProduct: ProductType[] = useSelector(
    (state: any) => state.product.product
  );

  const user: User = getLocal("loggedInUser");

  const cartUser: CartDetail[] = cart.filter(
    (item: CartDetail) => item.idUser === user?.id
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const userLogin = getLocal("loggedInUser");
    if (!userLogin) {
      navigate("/");
    } else {
      dispatch(getCart({ page: currentPage, limit: productsPerPage }));
    }
    if (id) {
      dispatch(getProductById(id));
    }
    dispatch(getCart({ page: currentPage, limit: productsPerPage }));
  }, [dispatch, currentPage, productsPerPage]);

  useEffect(() => {
    dispatch(getCart({ page: currentPage, limit: productsPerPage }));
    calculateTotalPrice();
  }, [selectedProducts, cartUser, listProduct]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProductsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleRemove = async (id: number) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa sản phẩm này không",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromCart(id)).then(() => {
          dispatch(getCart({ page: currentPage, limit: productsPerPage }));
        });
        Swal.fire("Deleted!", "Đã xóa thành công", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Hủy xóa sản phẩm", "error");
      }
    });
  };

  const handleSelectProduct = (id: number) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  console.log(selectedProducts);

  const handleSelectAll = () => {
    if (selectedProducts.length === cartUser.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(cartUser.map((item: any) => item.id));
    }
  };

  const handleRemoveSelected = async () => {
    if (selectedProducts.length === 0) {
      swal("Vui lòng chọn ít nhất một sản phẩm để xóa", {
        icon: "warning",
      });
      return;
    }

    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa những sản phẩm này không",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await Promise.all(
          selectedProducts.map((id) => dispatch(removeFromCart(id)))
        );

        setSelectedProducts([]);
        dispatch(getCart({ page: currentPage, limit: productsPerPage }));
        Swal.fire("Deleted!", "Đã xóa thành công", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Hủy xóa sản phẩm", "error");
      }
    });
  };

  const handleBuySelectedProducts = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (selectedProducts.length === 0) {
      swal("Vui lòng chọn ít nhất một sản phẩm để mua", {
        icon: "warning",
      });
      return;
    }

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const timeCreate = `${day}-${month}-${year}`;

    const selectedCartItems = cartUser.filter((item: any) =>
      selectedProducts.includes(item.id)
    );

    for (const cartItem of selectedCartItems) {
      const product = listProduct.find(
        (prod) => prod.id === cartItem.idProduct
      );

      if (product) {
        if (cartItem.quantity > product.total) {
          swal("Không đủ sản phẩm", "", "error");
          return;
        }

        const historyItem = {
          idUser: user.id,
          idProduct: product.id,
          quantity: cartItem.quantity,
          price: product.price * cartItem.quantity,
          created_at: timeCreate,
          status: false,
        };

        const newTotal = product.total - cartItem.quantity;
        const newPurchaseCount = product.purchaseCount + cartItem.quantity;

        dispatch(
          buyProduct({
            id: product.id,
            totalBuy: newTotal,
            purchaseCount: newPurchaseCount,
            status: false,
          })
        );
        dispatch(addHistory(historyItem));
        dispatch(removeFromCart(cartItem.id)).then(() => {
          dispatch(getCart({ page: currentPage, limit: productsPerPage }));
        });
      }
    }

    swal("Mua thành công", "", "success");

    setSelectedProducts([]);
  };

  const calculateTotalPrice = () => {
    let total = 0;
    selectedProducts.forEach((productId) => {
      const cartItem = cartUser.find(
        (item: any) => item.idProduct === productId
      );
      console.log(cartItem);

      if (cartItem) {
        const product = listProduct.find(
          (prod) => prod.id === cartItem.idProduct
        );
        if (product && selectedProducts.includes(cartItem.idProduct)) {
          total += product.price * cartItem.quantity;
        }
      }
    });
    setTotalPrice(total);
  };

  // Hàm xử lý giảm số lượng sản phẩm
  const handleDecreaseQuantity = (id: number) => {
    const cartItem = cartUser.find((item) => item.id === id);
    if (cartItem && cartItem.quantity > 1) {
      const updatedQuantity = cartItem.quantity - 1;
      dispatch(
        updatedQuantityCart({
          id: cartItem.id,
          updateQuantity: updatedQuantity,
        })
      ).then(() => {
        dispatch(getCart({ page: currentPage, limit: productsPerPage }));
      });
    }
  };

  // Hàm xử lý tăng số lượng sản phẩm
  const handleIncreaseQuantity = (id: number) => {
    const cartItem = cartUser.find((item) => item.id === id);
    if (cartItem) {
      const updatedQuantity = cartItem.quantity + 1;
      dispatch(
        updatedQuantityCart({
          id: cartItem.id,
          updateQuantity: updatedQuantity,
        })
      ).then(() => {
        dispatch(getCart({ page: currentPage, limit: productsPerPage }));
      });
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = cartUser.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="bg-white min-h-screen">
      <HeaderUser />
      <main>
        <section className="py-8">
          <div className="container">
            <h2 className="text-2xl font-display mb-4">Giỏ hàng</h2>
            <div className="overflow-auto rounded-lg border border-ink-100">
              <table className="w-full min-w-[700px]">
                <thead className="bg-ink-50 text-left text-sm text-ink-700">
                  <tr>
                    <th className="p-3"></th>
                    <th className="p-3">Sản phẩm</th>
                    <th className="p-3">Giá</th>
                    <th className="p-3">Số lượng</th>
                    <th className="p-3">Tổng tiền</th>
                    <th className="p-3">Chức năng</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-100">
                  {currentProducts.map((item: any) => {
                    const product = listProduct.find(
                      (prod: ProductType) => prod.id === item.idProduct
                    );
                    if (!product) return null;
                    return (
                      <tr key={item.id}>
                        <td className="p-3">
                          <input
                            type="checkbox"
                            checked={selectedProducts.includes(item.id)}
                            onChange={() => handleSelectProduct(item.id)}
                          />
                        </td>
                        <td className="p-3">
                          <Link to={`/product-detail/${product.id}`} className="flex items-center gap-3">
                            <img src={product.imageProduct[0]} alt={product.name} className="h-14 w-14 object-cover rounded" />
                            <span className="line-clamp-1">{product.name}</span>
                          </Link>
                        </td>
                        <td className="p-3">{product.price} USD</td>
                        <td className="p-3">
                          <div className="inline-flex items-center gap-2">
                            <button onClick={() => handleDecreaseQuantity(item.id)} className="w-7 h-7 rounded-md border border-ink-300">-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => handleIncreaseQuantity(item.id)} className="w-7 h-7 rounded-md border border-ink-300">+</button>
                          </div>
                        </td>
                        <td className="p-3">{product.price * item.quantity} USD</td>
                        <td className="p-3">
                          <button className="btn-ghost px-3 py-1.5" onClick={() => handleRemove(item.id)}>Xóa</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-ink-700">Số sản phẩm: {cartUser.length}</div>
              <div className="flex items-center gap-3">
                <label className="text-sm text-ink-700 flex items-center gap-2">
                  Hiển thị
                  <select
                    className="rounded-md border border-ink-300 px-2 py-1 outline-none focus:ring-2 focus:ring-brand-400"
                    name="productsPerPage"
                    id="productsPerPage"
                    value={productsPerPage}
                    onChange={handlePerPageChange}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </select>
                </label>
                <div className="flex gap-2">
                  {Array.from(
                    Array(Math.ceil(cartUser.length / productsPerPage)).keys()
                  ).map((number, index) => (
                    <button
                      key={index}
                      className={`px-3 py-1.5 rounded-md border ${
                        currentPage === number + 1
                          ? "bg-brand-600 text-white border-brand-600"
                          : "border-ink-200 text-ink-700 hover:bg-ink-100"
                      }`}
                      onClick={() => paginate(number + 1)}
                    >
                      {number + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 card p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <input
                    className="w-[16px] h-[16px]"
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedProducts.length === cartUser.length}
                  />
                  <label>Chọn tất cả sản phẩm</label>
                  <button className="btn-ghost px-3 py-1.5" onClick={handleRemoveSelected}>Xóa đã chọn</button>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-xl text-brand-700 font-semibold">Thành Tiền: {totalPrice} USD</p>
                  <button onClick={handleBuySelectedProducts} className="btn-primary px-4 py-2">Mua hàng</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterUser />
    </div>
  );
}
