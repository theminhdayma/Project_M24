import HeaderUser from "../../components/User/HeaderUser";
import FooterUser from "../../components/User/FooterUser";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Category, ProductType } from "../../interface";
import { useEffect } from "react";
import { getAllCategory, getProducts } from "../../service/product.service";

export default function Product() {
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

  // Lọc các hãng trùng lặp
  const uniqueBrands = listProduct
    .map((product) => product.brand)
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <>
      <HeaderUser />
      <main className="main">
        <nav>
          <div className="filter-sort">
            <select>
              {listCategory.map((category: Category, index: number) => (
                <option key={index} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <select>
              {uniqueBrands.map((brand, index) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
        </nav>
        <section className="product-list">
          <div className="container">
            <h2>Our Products</h2>
            <div className="product-grid">
              {listProduct.map((product: ProductType, index: number) => (
                <div key={index} className="product">
                  <Link to={`/product-detail/${product.id}`}>
                    <img src={product.imageProduct[0]} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>{product.price} USD</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <FooterUser />
    </>
  );
}
