import HeaderUser from "../../components/User/HeaderUser";
import FooterUser from "../../components/User/FooterUser";
import { Link } from "react-router-dom";

export default function Home() {

  return (
    <div className="bg-white">
      <HeaderUser />
      <main>
        <section className="hero">
          <div className="container">
            <h2>Welcome to My Shop</h2>
            <p>Your one-stop shop for all your needs.</p>
            <Link to={"/product"} className="cta-button">
              Shop Now
            </Link>
          </div>
        </section>
        <section className="featured-products">
          <div className="container">
            <h2>Featured Products</h2>
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
