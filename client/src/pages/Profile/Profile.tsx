import { Link, Outlet } from "react-router-dom";
import { User } from "../../interface";
import { getLocal } from "../../store/reducers/Local";
import { useEffect, useState } from "react";
import HeaderUser from "../../components/User/HeaderUser";

export default function Profile() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    const user = getLocal("loggedInUser");
    setLoggedInUser(user);
  }, []);

  return (
    <>
      <HeaderUser />
      <div style={{ marginTop: "130px" }} className="content-container">
        <div className="private-list">
          {loggedInUser ? (
            <>
              <Link to={`/profile/${loggedInUser.id}`}>
                <div className="person choose-private">Thông tin cá nhân</div>
              </Link>
              <Link to={`/profile/${loggedInUser.id}/history`}>
                <div className="history-info choose-private">
                  Lịch sử mua hàng
                </div>
              </Link>
            </>
          ) : (
            <div>Loading...</div>
          )}
          <a href="/product">
            <div className="history-info choose-private">Mua sản phẩm</div>
          </a>
        </div>
        <Outlet/>
      </div>
    </>
  );
}
