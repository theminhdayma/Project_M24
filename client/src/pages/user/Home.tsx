import HeaderUser from "../../components/User/HeaderUser";
import FooterUser from "../../components/User/FooterUser";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCategory, getProduct } from "../../service/product.service";
import { Category, ProductType } from "../../interface";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Home() {
  const [position, setPosition] = useState(0);
  const images = [
    "https://firebasestorage.googleapis.com/v0/b/projectreact-dd427.appspot.com/o/maxresdefault.jpg?alt=media&token=ac0eb718-a3af-48b9-ad7c-c87709844ed3",
    "https://firebasestorage.googleapis.com/v0/b/projectreact-dd427.appspot.com/o/banner1%20(1).jpg?alt=media&token=27344db6-94e8-4b28-bdb8-be44b53c2d19",
    "https://firebasestorage.googleapis.com/v0/b/projectreact-dd427.appspot.com/o/pasted%20image%200.png?alt=media&token=5ea816b5-1af1-454c-9d89-b5bae8575712",
  ];
  const bannerCount = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => (prevPosition + 1) % bannerCount);
    }, 1500);

    return () => clearInterval(interval);
  }, [bannerCount]);

  const handleLeftClick = () => {
    setPosition(
      (prevPosition) => (prevPosition - 1 + bannerCount) % bannerCount
    );
  };

  const handleRightClick = () => {
    setPosition((prevPosition) => (prevPosition + 1) % bannerCount);
  };

  // Lấy dữ liệu về product
  const listProduct: ProductType[] = useSelector(
    (state: any) => state.product.product
  );
  // Lấy dữ liệu về category
  const listCategory: Category[] = useSelector(
    (state: any) => state.product.category
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getAllCategory());
  }, [dispatch]);

  const topSellingProducts = listProduct
    .slice()
    .sort((a: any, b: any) => b.purchaseCount - a.purchaseCount)
    .slice(0, 10);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = event.target.value;
    navigate(`/product?category=${selectedCategoryId}`);
  };

  return (
    <section className="bg-white">
      <HeaderUser />
      <main>
        <Link to={"/product"} className="banner">
          <div className="banner-container">
            <div className="banner-container-img">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Banner ${index + 1}`}
                  className={`banner-img ${
                    index === position ? "banner-active" : ""
                  }`}
                />
              ))}
            </div>
            <div
              className="banner-btn-left banner-btn"
              onClick={handleLeftClick}
            >
              <i className="fas fa-angle-left"></i>
            </div>
            <div
              className="banner-btn-right banner-btn"
              onClick={handleRightClick}
            >
              <i className="fas fa-angle-right"></i>
            </div>
          </div>
        </Link>

        <section className="featured-products">
          <div className="container flex flex-col gap-4">
            <div className="w-[80%] flex justify-between">
              <h2 className="text-orange-600 text-2xl">Sản phẩm bán chạy</h2>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Danh mục sản phẩm</label>
                <select className="border border-gray-400 p-1" onChange={handleCategoryChange}>
                  <option value="">Chọn danh mục</option>
                  {listCategory.map((category: Category, index: number) => (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="product-grid">
              {topSellingProducts.map((product: any) => (
                <div key={product.id} className="product">
                  <Link to={`/product-detail/${product.id}`}>
                    <img src={product.imageProduct[0]} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>${product.price}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="container-body">
            <Link to={"/product"} className="slider">
              <div className="slide">
                <img
                  src="https://xuconcept.com/wp-content/uploads/2020/12/chup-anh-quan-ao-dep.jpg"
                  alt="Image 1"
                />
              </div>
              <div className="slide">
                <img
                  src="https://tse4.mm.bing.net/th?id=OIP.H-xGwrxG1Orap8eOsn5prwHaDn&pid=Api&P=0&h=180"
                  alt="Image 2"
                />
              </div>
              <div className="slide">
                <img
                  src="https://i.pinimg.com/736x/4a/a4/14/4aa41413cd1747bf58c221c31da5b14f.jpg"
                  alt="Image 3"
                />
              </div>
              <div className="slide">
                <img
                  src="https://dojeannam.com/wp-content/uploads/2017/10/banner-thoi-trang-nam-cong-so-2018.jpg"
                  alt="Image 4"
                />
              </div>
            </Link>
          </div>
        </section>
      </main>
      <FooterUser />
    </section>
  );
}
