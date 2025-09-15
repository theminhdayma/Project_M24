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
        status: false,
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
          status: false,
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
    <div className="bg-white min-h-screen">
      <HeaderUser />
      <main>
        <section className="py-8">
          <div className="container grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="aspect-[4/5] overflow-hidden rounded-xl border border-ink-100">
                <img
                  id="product-image"
                  src={product.imageProduct[0]}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {product.imageProduct.map((image: string, index: number) => (
                  <img key={index} src={image} alt={product.name} className="h-20 w-full object-cover rounded-md border border-ink-100" />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <span className="badge bg-brand-600 text-white w-max">Yêu thích +</span>
              <h2 className="text-xl font-medium">{product.name}</h2>
              <p className="text-ink-700">{product.description}</p>
              <p className="text-2xl font-semibold text-brand-700">{product.price} USD</p>
              <p className="text-sm text-ink-600">Chính sách: Trả hàng 15 ngày • <span className="text-ink-500">Đổi miễn phí</span></p>
              <div className="flex items-center gap-2 text-brand-600">
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star" />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm text-ink-700">Số lượng</label>
                <input
                  className="w-[100px] rounded-md border border-ink-300 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-400"
                  onChange={(e) => setInputValue(Number(e.target.value))}
                  type="number"
                  value={inputValue}
                  min="1"
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="btn-ghost px-4 py-2"
                  onClick={handleAddToCart}
                >
                  Thêm vào giỏ hàng
                </button>
                <button onClick={handleBuyProduct} className="btn-primary px-4 py-2">
                  Mua hàng
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container">
            <h3 className="text-xl font-display mb-4">Gợi Ý Sản Phẩm</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {relateProduct.map((product: ProductType) => (
                <Link key={product.id} to={`/product-detail/${product.id}`} className="card overflow-hidden">
                  <img src={product.imageProduct[0]} alt={product.name} className="aspect-[4/5] w-full object-cover" />
                  <div className="p-3">
                    <h3 className="text-sm font-medium line-clamp-1">{product.name}</h3>
                    <p className="mt-1 text-brand-700 font-semibold">{product.price} USD</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <FooterUser />
    </div>
  );
}
