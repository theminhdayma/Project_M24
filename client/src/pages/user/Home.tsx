import HeaderUser from "../../components/User/HeaderUser";
import FooterUser from "../../components/User/FooterUser";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCategory, getProducts } from "../../service/product.service";
import { Category, ProductType } from "../../interface";

export default function Home() {
  // Lấy dữ liệu về product
  const listProduct: ProductType[] = useSelector(
    (state: any) => state.product.product
  );
  // Lấy dữ liệu về category
  const listCategory: Category[] = useSelector(
    (state: any) => state.product.category
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getAllCategory());
  }, []);

  const topSellingProducts = listProduct
    .slice()
    .sort((a: any, b: any) => b.purchaseCount - a.purchaseCount)
    .slice(0, 10);

  return (
    <div className="bg-white">
      <HeaderUser />
      <main>
        <section className="hero">
          <div className="container">
            <h2>Welcome to My Shop</h2>
            <p>Your one-stop shop for all your needs.</p>
            <Link to={"/product"} className="shop_now">
              Shop Now
            </Link>
          </div>
        </section>
        <section className="featured-products">
          <div className="container flex flex-col gap-4">
            <div className="w-[80%] flex justify-between">
              <h2 className="text-orange-600 text-2xl">Sản phẩm bán chạy</h2>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Danh mục sản phẩm</label>
                <select className="border border-gray-400 p-1">
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
            <div className="slider">
              <div className="slide">
                <img
                  src="https://xuconcept.com/wp-content/uploads/2020/12/chup-anh-quan-ao-dep.jpg"
                  alt="Image 1"
                />
              </div>
              <div className="slide">
                <img
                  src="https://xuconcept.com/wp-content/uploads/2020/12/chup-anh-quan-ao-dep.jpg"
                  alt="Image 2"
                />
              </div>
              <div className="slide">
                <img
                  src="https://www.businessconnection.com.br/wp-content/uploads/2021/08/Shopee-Entenda-o-sucesso-do-app-mais-acessado-em-julho-de-2021.jpeg"
                  alt="Image 3"
                />
              </div>
              <div className="slide">
                <img
                  src="https://c8.alamy.com/comp/2H0PMHP/shopee-is-e-commerce-technology-company-shopping-cart-with-parcels-on-the-background-of-the-shopee-logo-2H0PMHP.jpg"
                  alt="Image 4"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterUser />
    </div>
  );
}
