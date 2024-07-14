import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartDetail, ProductType, User } from "../../interface";
import { useEffect, useState } from "react";
import { logout } from "../../service/user.service";
import { getLocal } from "../../store/reducers/Local";
import { getProduct } from "../../service/product.service";
import { loadCart } from "../../service/cart.service";
import Swal from "sweetalert2";

export default function HeaderUser() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state: any) => state.cart.cartDetail);

  const listProduct: ProductType[] = useSelector(
    (state: any) => state.product.product
  );

  const cartUser: CartDetail[] = cart.filter(
    (item: CartDetail) => item.idUser === loggedInUser?.id
  );

  // Danh sách sản phẩm trong giỏ hàng
  const listCart: any[] = [];
  cartUser.forEach((cartItem: CartDetail) => {
    const product = listProduct.find(
      (productItem: ProductType) => productItem.id === cartItem.idProduct
    );
    if (product) {
      listCart.push(product);
    }
  });

  useEffect(() => {
    dispatch(getProduct());
    dispatch(loadCart());
    const user = getLocal("loggedInUser");
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  const cartLoggedUser = cartUser
    .filter((cartItem: any) => cartItem.idUser === loggedInUser?.id)
    .slice(0, 4);

  const handleLogout = () => {
    if (loggedInUser) {
      Swal.fire({
        title: "Bạn có chắc chắn muốn đăng xuất không ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Đăng xuất",
        cancelButtonText: "Hủy",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(logout(loggedInUser.id)).then(() => {
            setLoggedInUser(null);
            navigate("/");
          });
          Swal.fire("", "Đăng xuất thành công", "success");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("", "Hủy đăng xuất", "error");
        }
      });
    }
  };

  return (
    <header>
      <div style={{ display: "flex" }} className="container-header">
        <div className="header-top">
          {loggedInUser?.role === 0 && (
            <Link
              style={{
                width: "100px",
                fontSize: "30px",
                fontWeight: "600",
                color: "green",
                padding: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              to={"/admin"}
            >
              <i className="bx bxs-log-out-circle text-3xl" />
              <span>Admin</span>
            </Link>
          )}

          <div className="logo">
            <img
              src="https://designercomvn.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2018/12/06090103/logo-shop-qu%E1%BA%A7n-%C3%A1o-8.png"
              alt=""
            />
            <h1>My Shop</h1>
          </div>
          <nav>
            <ul>
              <li>
                <Link to={"/"}>Trang chủ</Link>
              </li>
              <li>
                <Link to={"/product"}>Sản phẩm</Link>
              </li>
              <li>
                <Link to={"/contact"}>Liên hệ</Link>
              </li>
            </ul>
          </nav>
          {loggedInUser ? (
            <div className="flex flex-col justify-center items-center gap-2">
              <Link
                to={`/profile/${loggedInUser.id}`}
                className="flex gap-2 justify-center items-center"
              >
                {loggedInUser.image === "" ? (
                  <img
                    className="w-9 h-9 object-cover rounded-full"
                    src="https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
                    alt={loggedInUser.name}
                  />
                ) : (
                  <img
                    className="w-9 h-9 object-cover rounded-full"
                    src={loggedInUser.image}
                    alt={loggedInUser.name}
                  />
                )}
                <h2 className="text-xl">{loggedInUser.name}</h2>
              </Link>
              <button
                onClick={handleLogout}
                className="px-2 py-1 bg-red-500 text-white border-none cursor-pointer transition duration-300 ease-in-out hover:bg-red-600"
              >
                Đăng Xuất
              </button>
            </div>
          ) : (
            <div className="login-logout">
              <Link to={"/register"}>Đăng ký</Link>
              <div className="doc" />
              <Link to={"/login"}>Đăng nhập</Link>
            </div>
          )}
          <div className="cart-container">
            <Link to={`/cart/${loggedInUser?.id}`} className="cart-icon">
              <i className="fa-solid fa-cart-shopping" />
              {loggedInUser && (
                <div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs">
                  {cartUser.length}
                </div>
              )}
            </Link>
            <div className="cart-details">
              <ul>
                {cartLoggedUser.length > 0 ? (
                  cartLoggedUser.map((item: any) => {
                    const product = listProduct.find(
                      (prod: ProductType) => prod.id === item.idProduct
                    );
                    if (!product) return null;
                    return (
                      <li key={item.id}>
                        <Link to={`/product-detail/${item.idProduct}`}>
                          <div className="cart-item">
                            <img
                              src={product.imageProduct[0]}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-full"
                            />
                            <div className="w-[150px]">
                              <p>{product.name}</p>
                              <p>{product.price} USD</p>
                            </div>
                            <p>{item.quantity} sản phẩm</p>
                          </div>
                        </Link>
                      </li>
                    );
                  })
                ) : (
                  <li>
                    <h3>Chưa có sản phẩm nào trong giỏ hàng</h3>
                  </li>
                )}
              </ul>
              <div className="cart-summary">
                {loggedInUser ? (
                  <p className="text-2xl">{cartUser.length} sản phẩm</p>
                ) : (
                  ""
                )}
                <Link to={`/cart/${loggedInUser?.id}`} className="checkout-btn">
                  View Cart
                </Link>
              </div>
            </div>
            {/* hover cart  */}
          </div>
        </div>
      </div>
    </header>
  );
}
