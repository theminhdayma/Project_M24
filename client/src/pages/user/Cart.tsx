import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FooterUser from "../../components/User/FooterUser";
import HeaderUser from "../../components/User/HeaderUser";
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
        };

        const newTotal = product.total - cartItem.quantity;
        const newPurchaseCount = product.purchaseCount + cartItem.quantity;

        dispatch(
          buyProduct({
            id: product.id,
            totalBuy: newTotal,
            purchaseCount: newPurchaseCount,
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
    <div className="mt-[120px]">
      <HeaderUser />
      <main>
        <section className="cart">
          <div className="container">
            <h2>Your Shopping Cart</h2>
            <table className="cart-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Sản Phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Tổng tiền</th>
                  <th>Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((item: any) => {
                  const product = listProduct.find(
                    (prod: ProductType) => prod.id === item.idProduct
                  );
                  if (!product) return null;
                  return (
                    <tr key={item.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(item.id)}
                          onChange={() => handleSelectProduct(item.id)}
                        />
                      </td>
                      <td>
                        <Link
                          to={`/product-detail/${product.id}`}
                          className="cart-item"
                        >
                          <img
                            src={product.imageProduct[0]}
                            alt={product.name}
                          />
                          <span>{product.name}</span>
                        </Link>
                      </td>
                      <td>{product.price} USD</td>
                      <td className="h-[100px] flex justify-center items-center gap-2">
                        <button
                          onClick={() => handleDecreaseQuantity(item.id)}
                          className="w-[30px] border border-gray-700"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => handleIncreaseQuantity(item.id)}
                          className="w-[30px] border border-gray-700"
                        >
                          +
                        </button>
                      </td>
                      <td>{product.price * item.quantity} USD</td>
                      <td>
                        <button
                          className="remove-btn"
                          onClick={() => handleRemove(item.id)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-between items-center">
              <div className="w-[250px] text-2xl">
                Số sản phẩm: {cartUser.length}
              </div>
              <div className="w-full p-3 flex justify-end items-center gap-2">
                <div>
                  <select
                    className="border border-gray-800"
                    name="productsPerPage"
                    id="productsPerPage"
                    value={productsPerPage}
                    onChange={handlePerPageChange}
                  >
                    <option value="5">5 items</option>
                    <option value="10">10 items</option>
                    <option value="15">15 items</option>
                    <option value="20">20 items</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  {Array.from(
                    Array(Math.ceil(cartUser.length / productsPerPage)).keys()
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
            <div className="cart-summary">
              <div className="flex justify-center items-center gap-5">
                <div className="flex justify-center items-center gap-2">
                  <input
                    className="w-[16px] h-[16px]"
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedProducts.length === cartUser.length}
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
                  <span>Thành Tiền:</span>
                  {totalPrice} USD
                </p>
                <button
                  onClick={handleBuySelectedProducts}
                  className="checkout-btn"
                >
                  Mua hàng
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterUser />
    </div>
  );
}
