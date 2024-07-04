import FooterUser from "../../components/User/FooterUser";
import HeaderUser from "../../components/User/HeaderUser";

export default function Cart() {
  return (
    <>
      <HeaderUser />
      <main>
        <section className="cart">
          <div className="container">
            <h2>Your Shopping Cart</h2>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="cart-item">
                      <img src="images/product1.jpg" alt="Product 1" />
                      <span>Product 1</span>
                    </div>
                  </td>
                  <td>$10.00</td>
                  <td>
                    <input type="number" defaultValue={1} min={1} />
                  </td>
                  <td>$10.00</td>
                  <td>
                    <button className="remove-btn">Remove</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="cart-item">
                      <img src="images/product2.jpg" alt="Product 2" />
                      <span>Product 2</span>
                    </div>
                  </td>
                  <td>$20.00</td>
                  <td>
                    <input type="number" defaultValue={1} min={1} />
                  </td>
                  <td>$20.00</td>
                  <td>
                    <button className="remove-btn">Remove</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="cart-summary">
              <h3>Cart Summary</h3>
              <p>Subtotal: $30.00</p>
              <p>Tax: $3.00</p>
              <p>Total: $33.00</p>
              <button className="checkout-btn">Proceed to Checkout</button>
            </div>
          </div>
        </section>
      </main>
      <FooterUser />
    </>
  );
}
