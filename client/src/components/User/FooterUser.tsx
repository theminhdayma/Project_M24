export default function FooterUser() {
  return (
    <footer>
      <div className="footer-content">
        <div className="logo">
          <img
            src="https://designercomvn.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2018/12/06090103/logo-shop-qu%E1%BA%A7n-%C3%A1o-8.png"
            alt=""
          />
          <h1>My Shop</h1>
        </div>
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li>
              <a href="#">Trang chủ</a>
            </li>
            <li>
              <a href="#">Sản phẩm</a>
            </li>
            <li>
              <a href="#">Dịch vụ</a>
            </li>
            <li>
              <a href="#">Liên Hệ</a>
            </li>
          </ul>
        </div>
        <div className="footer-section about">
          <h2>About Us</h2>
          <div className="contact">
            <span>
              <i className="fas fa-phone" /> &nbsp; +84 364 577 211
            </span>
            <span>
              <i className="fas fa-envelope" /> &nbsp; theminh2005z@gmail.com
            </span>
            <p>Niềm vui của khách hàng là niềm tự hào của chúng tôi</p>
          </div>
          <div className="social">
            <a href="#">
              <i className="fab fa-facebook" />
            </a>
            <a href="#">
              <i className="fab fa-twitter" />
            </a>
            <a href="#">
              <i className="fab fa-instagram" />
            </a>
            <a href="#">
              <i className="fab fa-linkedin" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        © 2024 YourCompany. All rights reserved.
      </div>
    </footer>
  );
}
