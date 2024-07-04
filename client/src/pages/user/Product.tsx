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
  console.log(listProduct);

  return (
    <>
      <HeaderUser />
      <main>
        <section className="product-list">
          <div className="container">
            <h2>Our Products</h2>
            <div className="product-grid">
              <div className="product">
                <Link to={"/product-detail"}>
                  <img src="images/product1.jpg" alt="Product 1" />
                  <h3>Product 1</h3>
                  <p>$10.00</p>
                </Link>
              </div>
              <div className="product">
                <Link to={"/product-detail"}>
                  <img src="images/product2.jpg" alt="Product 2" />
                  <h3>Product 2</h3>
                  <p>$20.00</p>
                </Link>
              </div>
              <div className="product">
                <Link to={"/product-detail"}>
                  <img src="images/product3.jpg" alt="Product 3" />
                  <h3>Product 3</h3>
                  <p>$30.00</p>
                </Link>
              </div>
              <div className="product">
                <Link to={"/product-detail"}>
                  <img src="images/product4.jpg" alt="Product 4" />
                  <h3>Product 4</h3>
                  <p>$40.00</p>
                </Link>
              </div>
              <div className="product">
                <Link to={"/product-detail"}>
                  <img src="images/product5.jpg" alt="Product 5" />
                  <h3>Product 5</h3>
                  <p>$50.00</p>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterUser />
    </>
  );
}
