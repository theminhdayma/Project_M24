import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartDetail, User } from "../../interface";
import { useEffect, useState } from "react";
import { logout } from "../../service/user.service";
import { getLocal } from "../../store/reducers/Local";
import { getCart } from "../../service/cart.service";

export default function HeaderUser() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart.cartDetail);

  useEffect(() => {
    dispatch(getCart());
    const user = getLocal("loggedInUser");
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  const cartLoggedUser = cart
    .filter((cartItem: any) => cartItem.idUser === loggedInUser?.id)
    .slice(0, 4);

  const handleLogout = () => {
    if (loggedInUser) {
      dispatch(logout(loggedInUser.id)).then(() => {
        setLoggedInUser(null);
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
                to={"/product"}
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
            </Link>
            <div className="cart-details">
              <ul>
                {cartLoggedUser.length > 0 ? (
                  cartLoggedUser.map((cartItem: CartDetail, index: number) => (
                    <li key={index}>
                      <Link to={`/product-detail/${cartItem.idProduct}`}>
                        <div className="cart-item">
                          <img
                            src={cartItem.image[0]}
                            alt={cartItem.name}
                            className="w-16 h-16 object-cover rounded-full"
                          />
                          <div className="w-[150px]">
                            <p>{cartItem.name}</p>
                            <p>{cartItem.price} USD</p>
                          </div>
                          <p>{cartItem.quantity} sản phẩm</p>
                        </div>
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>
                    <h3>Chưa có sản phẩm nào trong giỏ hàng</h3>
                  </li>
                )}
              </ul>
              <div className="cart-summary">
                {loggedInUser ? (
                  <p className="text-2xl">
                    {/* Total:{" "}
                    {cart.reduce(
                      (acc: number, item: any) =>
                        acc + item.price * item.quantity,
                      0
                    )}{" "}
                    USD */}
                    {cart.length} sản phẩm
                  </p>
                ) : (
                  ""
                )}
                <Link to={`/cart/${loggedInUser?.id}`} className="checkout-btn">
                  View Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="search-bar">
          <form action="search_results.html" method="get">
            <input type="text" name="query" placeholder="Search products..." />
            <button type="submit">Search</button>
          </form>
        </div> */}
      </div>
    </header>
  );
}
