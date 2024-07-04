import HeaderUser from "../../components/User/HeaderUser";
import FooterUser from "../../components/User/FooterUser";

export default function ProductDetail() {
  return (
    <>
      <HeaderUser />
      <main>
        <section className="product-detail">
          <div className="container">
            <div className="product-image">
              <img id="product-image" src="" alt="Product Image" />
            </div>
            <div className="product-info">
              <h2 id="product-name">Product Name</h2>
              <p id="product-price">$0.00</p>
              <p id="product-description">Product description goes here.</p>
              <button className="cta-button">Add to Cart</button>
            </div>
          </div>
        </section>
      </main>
      <FooterUser />
    </>
  );
}
