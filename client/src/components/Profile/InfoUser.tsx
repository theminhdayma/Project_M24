import { useEffect, useState } from "react";
import { User } from "../../interface";
import { getLocal } from "../../store/reducers/Local";

export default function InfoUser() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    const user = getLocal("loggedInUser");
    setLoggedInUser(user);
  }, []);

  return (
    <>
      <div className="private-info" id="profileContent">
        {loggedInUser && (
          <>
            <div className="image-container">
              <div>
                {loggedInUser.image === "" ? (
                  <img
                    style={{
                      width: "100%",
                      height: "326px",
                      borderRadius: "6px",
                    }}
                    className="w-9 h-9 object-cover rounded-full"
                    src="https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
                    alt={loggedInUser.name}
                  />
                ) : (
                  <img
                    style={{
                      width: "100%",
                      height: "326px",
                      borderRadius: "6px",
                    }}
                    src={loggedInUser.image}
                    alt={loggedInUser.name}
                  />
                )}
              </div>
              <h3
                style={{
                  fontSize: "20px",
                  backgroundColor: "#f8f9fa",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                {loggedInUser.name}
              </h3>
              <div className="button-choose">
                <button
                  style={{
                    fontSize: "14px",
                    padding: "10px 20px",
                    border: "transparent",
                    borderRadius: "6px",
                    backgroundColor: "greenyellow",
                  }}
                  id="changeAvt"
                >
                  Thay đổi ảnh
                </button>
                <button
                  style={{
                    padding: "10px 20px",
                    border: "transparent",
                    borderRadius: "6px",
                    backgroundColor: "greenyellow",
                  }}
                >
                  Đổi thông tin
                </button>
                <button
                  style={{
                    padding: "10px 20px",
                    border: "transparent",
                    borderRadius: "6px",
                    backgroundColor: "greenyellow",
                  }}
                >
                  Đổi mật khẩu
                </button>
              </div>
            </div>
            <div className="user-infomation">
              <h1
                style={{
                  textAlign: "center",
                  padding: "10px",
                  backgroundColor: "#343a40",
                  color: "#f8f9fa",
                }}
              >
                Thông tin cá nhân
              </h1>
              <div className="info-users-container">
                <label style={{ fontWeight: 600 }}>Tên người dùng:&ensp;</label>
                <span>{loggedInUser.name}</span>
              </div>
              <hr />
              <div className="info-users-container">
                <label style={{ fontWeight: 600 }}>Email:&ensp;</label>
                <span>{loggedInUser.email}</span>
              </div>
              <hr />
              <div className="info-users-container">
                <label style={{ fontWeight: 600 }}>Địa chỉ:&ensp;</label>
                <span>{loggedInUser.address}</span>
              </div>
              <hr />
              <div className="info-users-container">
                <label style={{ fontWeight: 600 }}>Số điện thoại:&ensp;</label>
                <span>{loggedInUser.numberPhone}</span>
              </div>
              <hr />
            </div>
          </>
        )}
      </div>
    </>
  );
}
