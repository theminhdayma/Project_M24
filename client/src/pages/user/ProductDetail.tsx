import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HeaderUser from "../../components/User/HeaderUser";
import FooterUser from "../../components/User/FooterUser";
import { getProductById } from "../../service/product.service";
import { addToCart, buyProduct } from "../../service/cart.service";
import { User } from "../../interface";
import { getLocal } from "../../store/reducers/Local";
import swal from "sweetalert";

export default function ProductDetail() {
  const [inputValue, setInputValue] = useState<number>(1);
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
  }, [id, dispatch]);

  const product = useSelector((state: any) =>
    state.product.product.find((prod: any) => prod.id === Number(id))
  );

  const user: User = getLocal("loggedInUser");

  const handleAddToCart = () => {
    if (inputValue > product.total) {
      swal("Không đủ sản phẩm", "", "error");
      setInputValue(1);
      return;
    }
    if (!user) {
      navigate("/login");
      return;
    }
    if (product) {
      const cartItem = {
        idUser: user.id,
        idProduct: product.id,
        brand: product.brand,
        name: product.name,
        price: product.price,
        quantity: inputValue,
        image: product.imageProduct,
        status: false,
      };
      swal({
        title: "Thêm Thành Công !!!",
        text: `Đã thêm thành công ${product.name}`,
        icon: "success",
        button: "Aww yiss!",
      });
      dispatch(addToCart(cartItem));
      setInputValue(1);
    }
  };

  const handleBuyProduct = () => {
    if (inputValue > product.total) {
      swal("Không đủ sản phẩm", "", "error");
      setInputValue(1);
      return;
    }
    if (!user) {
      navigate("/login");
      return;
    }
    if (product) {
      const cartItem = {
        idUser: user.id,
        idProduct: product.id,
        brand: product.brand,
        name: product.name,
        price: product.price,
        quantity: inputValue,
        image: product.imageProduct,
        status: true,
      };
      swal({
        title: "Thêm Thành Công !!!",
        text: `Đã thêm thành công ${product.name}`,
        icon: "success",
        button: "Aww yiss!",
      });
      dispatch(
        buyProduct({
          productId: cartItem.idProduct,
          newTotal: product.total - inputValue,
        })
      );
      setInputValue(1);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <HeaderUser />
      <main>
        <section className="product-detail">
          <div className="container-detail">
            <div className="product-image">
              <img
                id="product-image"
                src={product.imageProduct[0]}
                alt={product.name}
              />
              <div className="list-img">
                {product.imageProduct.map((image: string, index: number) => (
                  <img key={index} src={image} alt={product.name} />
                ))}
              </div>
            </div>
            <div className="product-info">
              <div className="w-[100px] bg-orange-600 text-white flex justify-center items-center">
                Yêu thích +
              </div>
              <h2 className="product-name">{product.description}</h2>
              <p className="name" id="product-description">
                {product.name}
              </p>
              <p id="product-price">{product.price} USD</p>
              <p>
                Chính sách trả sách: Trả hàng 15 ngày &emsp;{" "}
                <span className="text-gray-500 text-[14px]">Đổi miễn phí</span>
              </p>
              <div className="listStar">
                <p className="h-[30px] flex justify-center items-center">
                  Đánh giá:{" "}
                </p>
                <div className="stars">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>
              <div className="w-[50%] flex justify-center items-center gap-5 p-1">
                <label htmlFor="">Mua số sản phẩm</label>
                <input
                  className="w-[100px] border border-gray-400 p-1"
                  onChange={(e) => setInputValue(Number(e.target.value))}
                  type="number"
                  value={inputValue}
                  min="1"
                />
              </div>
              <div className="button-list">
                <button
                  className="add-button bg-yellow-300"
                  onClick={handleAddToCart}
                >
                  Thêm vào giỏ hàng
                </button>
                <button onClick={handleBuyProduct} className="buy-button">Mua hàng</button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterUser />
    </>
  );
}

