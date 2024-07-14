import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HeaderUser from "../../components/User/HeaderUser";
import FooterUser from "../../components/User/FooterUser";
import { getProduct, getProductById } from "../../service/product.service";
import { addHistory, addToCart, buyProduct } from "../../service/cart.service";
import { ProductType, User } from "../../interface";
import { getLocal } from "../../store/reducers/Local";
import swal from "sweetalert";

export default function ProductDetail() {
  const [inputValue, setInputValue] = useState<number>(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProduct());
    if (id) {
      dispatch(getProductById(id));
    }
  }, [id, dispatch]);

  const listProduct: ProductType[] = useSelector(
    (state: any) => state.product.product
  );

  const product: any = listProduct.find((prod: any) => prod.id === Number(id));
  const relateProduct = listProduct.filter((pro) => {
    return pro.brand === product?.brand && pro.id !== product.id;
  });
  console.log(relateProduct);

  const user: User = getLocal("loggedInUser");

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (inputValue > product.total) {
      swal("Không đủ sản phẩm", "", "error");
      setInputValue(1);
      return;
    }

    if (product) {
      const cartItem = {
        idUser: user.id,
        idProduct: product.id,
        quantity: inputValue,
        price: product.price * inputValue,
      };
      swal("Thêm thành công", "", "success");
      dispatch(addToCart(cartItem));
      setInputValue(1);
    }
  };

  const handleBuyProduct = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (inputValue > product.total) {
      swal("Không đủ sản phẩm", "", "error");
      setInputValue(1);
      return;
    }

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const timeCreate = `${day}-${month}-${year}`;

    if (product) {
      const historyItem = {
        idUser: user.id,
        idProduct: product.id,
        quantity: inputValue,
        price: product.price * inputValue,
        created_at: timeCreate,
      };
      swal("Mua thành công", "", "success");

      // Tính toán số lượng sản phẩm còn lại và số lần mua mới
      const newTotal = product.total - inputValue;
      const newPurchaseCount = product.purchaseCount + inputValue;

      // Gọi action buyProduct để cập nhật thông tin sản phẩm
      dispatch(
        buyProduct({
          id: product.id,
          totalBuy: newTotal,
          purchaseCount: newPurchaseCount,
        })
      );
      dispatch(addHistory(historyItem));
      setInputValue(1);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-[120px]">
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
                <button onClick={handleBuyProduct} className="buy-button">
                  Mua hàng
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-10 flex flex-col gap-10">
          <h1 className="w-full text-center text-3xl font-semibold">Gợi Ý Sản Phẩm</h1>
          <hr />
          <div className="widthImage product-grid">
            {relateProduct.map((product: ProductType) => (
              <div key={product.id} className="product product1">
                <Link to={`/product-detail/${product.id}`}>
                  <img src={product.imageProduct[0]} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>{product.price} USD</p>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
      <FooterUser />
    </div>
  );
}
