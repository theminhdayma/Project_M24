import HeaderUser from "../../components/User/HeaderUser";
import FooterUser from "../../components/User/FooterUser";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ProductType } from "../../interface";
import { useEffect } from "react";
import { getProducts } from "../../service/product.service";

export default function Product() {
  // Lấy dữ liệu về product
  const listProduct: ProductType[] = useSelector(
    (state: any) => state.product.product
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <>
      <HeaderUser />
      <main className="main">
        <nav>
          <div className="filter-sort">
            <select>
              <option value="all">All</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              {/* Add more categories as needed */}
            </select>
            <select>
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>
        </nav>
        <section className="product-list">
          <div className="container">
            <h2>Our Products</h2>
            <div className="product-grid">
              {listProduct.map((product: ProductType, index: number) => (
                <div key={index} className="product">
                  <Link to={"/product-detail"}>
                    <img
                      src={product.imageProduct[0]}
                      alt={product.nameProduct}
                    />
                    <h3>{product.nameProduct}</h3>
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
