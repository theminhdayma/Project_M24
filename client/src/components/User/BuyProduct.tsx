import { useState } from "react";
import FooterUser from "./FooterUser";
import HeaderUser from "./HeaderUser";

export default function BuyProduct() {
  const [selectedPayment, setSelectedPayment] = useState<string>("Credit Card");

  const handlePaymentSelection = (paymentMethod: string) => {
    setSelectedPayment(paymentMethod);
  };
  return (
    <>
      <HeaderUser />
      <body className="body-buy">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="card">
              <div className="row">
                <div className="col-lg-3 radio-group">
                  <div
                    className={`row d-flex px-3 radio ${
                      selectedPayment === "Credit Card" ? "" : "gray"
                    }`}
                    onClick={() => handlePaymentSelection("Credit Card")}
                  >
                    <img
                      className="pay"
                      src="https://i.imgur.com/WIAP9Ku.jpg"
                      alt="Credit Card"
                    />
                    <p className="my-auto">Credit Card</p>
                  </div>
                  <div
                    className={`row d-flex px-3 radio ${
                      selectedPayment === "Debit Card" ? "" : "gray"
                    }`}
                    onClick={() => handlePaymentSelection("Debit Card")}
                  >
                    <img
                      className="pay"
                      src="https://i.imgur.com/OdxcctP.jpg"
                      alt="Debit Card"
                    />
                    <p className="my-auto">Debit Card</p>
                  </div>
                  <div
                    className={`row d-flex px-3 radio ${
                      selectedPayment === "PayPal" ? "" : "gray"
                    } mb-3`}
                    onClick={() => handlePaymentSelection("PayPal")}
                  >
                    <img
                      className="pay"
                      src="https://i.imgur.com/cMk1MtK.jpg"
                      alt="PayPal"
                    />
                    <p className="my-auto">PayPal</p>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="row px-2">
                    <div className="form-group col-md-6">
                      <label className="form-control-label">Người Nhận</label>
                      <input
                        type="text"
                        id="cname"
                        name="cname"
                        placeholder="Tên người nhận"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label className="form-control-label">Số điện thoại</label>
                      <input
                        type="text"
                        id="cnum"
                        name="cnum"
                        placeholder="0987654321"
                      />
                    </div>
                  </div>
                  <div className="row px-2">
                    <div className="form-group col-md-6">
                      <label className="form-control-label">
                        Số thẻ
                      </label>
                      <input
                        type="text"
                        id="exp"
                        name="exp"
                        placeholder="111 222 333 444"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label className="form-control-label">Địa chỉ nhận</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        placeholder="Hà Nội"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 mt-2">
                  <div className="row d-flex justify-content-between px-4">
                    <p className="mb-1 text-left">Tổng tiền</p>
                    <h6 className="mb-1 text-right">432 USD</h6>
                  </div>
                  <div className="row d-flex justify-content-between px-4">
                    <p className="mb-1 text-left">Phí Ship</p>
                    <h6 className="mb-1 text-right">45 USD</h6>
                  </div>
                  <div
                    className="row d-flex justify-content-between px-4"
                    id="tax"
                  >
                    <p className="mb-1 text-left">Thành Tiền</p>
                    <h6 className="mb-1 text-right">324 USD</h6>
                  </div>
                  <button className="btn-block btn-blue">
                    <span>
                      <span id="checkout">Mua hàng</span>
                      <span id="check-amt">453 USD</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
      <FooterUser />
    </>
  );
}
