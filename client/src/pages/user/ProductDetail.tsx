import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HeaderUser from "../../components/User/HeaderUser";
import FooterUser from "../../components/User/FooterUser";
import { getProductById } from "../../service/product.service"; // Tạo action này nếu cần

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
  }, [id, dispatch]);

  const product = useSelector((state: any) =>
    state.product.product.find((prod: any) => prod.id === Number(id))
  );

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <HeaderUser />
      <main>
        <section className="product-detail">
          <div className="container">
            <div className="product-image">
              <img id="product-image" src={product.imageProduct[0]} alt={product.name} />
            </div>
            <div className="product-info">
              <h2 id="product-name">{product.name}</h2>
              <p id="product-price">{product.price} USD</p>
              <p id="product-description">{product.description}</p>
              <button className="cta-button">Add to Cart</button>
            </div>
          </div>
        </section>
      </main>
      <FooterUser />
    </>
  );
}
