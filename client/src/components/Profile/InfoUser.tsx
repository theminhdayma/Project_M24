import { useEffect, useState } from "react";
import { User } from "../../interface";
import { getLocal, saveLocal } from "../../store/reducers/Local";
import Swal from "sweetalert2";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { storage } from "../../config/firebase";
import FromUpdateUser from "../From/FromUpdateUser";
import CryptoJS from "crypto-js";

export default function InfoUser() {
  const [showFromUpdateUser, setShowFromUpdateUser] = useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = getLocal("loggedInUser");
    setLoggedInUser(user);
  }, []);

  const handleChangeAvt = () => {
    Swal.fire({
      title: "Chọn ảnh",
      input: "file",
      inputAttributes: {
        accept: "avatars/*",
        "aria-label": "Upload your profile picture",
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const file = result.value as File;
        const storageRef = ref(storage, `avatars/${file.name}`);

        setLoading(true);

        uploadBytes(storageRef, file)
          .then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
              if (loggedInUser) {
                const updatedUser = { ...loggedInUser, image: downloadURL };
                saveLocal("loggedInUser", updatedUser);
                axios
                  .put(
                    `http://localhost:8080/accounts/${loggedInUser.id}`,
                    updatedUser
                  )
                  .then(() => {
                    setLoggedInUser(updatedUser);
                    setLoading(false);
                    Swal.fire({
                      title: "Ảnh của bạn",
                      imageUrl: downloadURL,
                      imageAlt: "Ảnh đã tải lên",
                    });
                  })
                  .catch((error) => {
                    console.error("Error updating avatar URL:", error);
                    setLoading(false);
                    Swal.fire("Error", "Failed to update avatar URL", "error");
                  });
              }
            });
          })
          .catch((error) => {
            console.error("Error uploading avatar:", error);
            setLoading(false);
            Swal.fire("Error", "Failed to upload avatar", "error");
          });
      }
    });
  };

  const close = () => {
    setShowFromUpdateUser(false);
  };

  const handleChangePassword = () => {
    Swal.fire({
      title: "Nhập mật khẩu hiện tại",
      input: "password",
      inputAttributes: {
        autocapitalize: "off",
        autocorrect: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Tiếp tục",
      showLoaderOnConfirm: true,
      preConfirm: (currentPassword) => {
        const bytes = CryptoJS.AES.decrypt(
          loggedInUser?.password || "",
          "secret_key"
        );
        const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
        console.log(decryptedPassword);

        if (currentPassword !== decryptedPassword) {
          Swal.showValidationMessage("Mật khẩu hiện tại không chính xác");
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Nhập mật khẩu mới",
          input: "password",
          inputAttributes: {
            autocapitalize: "off",
            autocorrect: "off",
            minlength: "8",
          },
          showCancelButton: true,
          confirmButtonText: "Đổi mật khẩu",
          showLoaderOnConfirm: true,
          preConfirm: (newPassword) => {
            if (newPassword.length < 8) {
              Swal.showValidationMessage("Mật khẩu phải có ít nhất 8 ký tự");
            }
            return newPassword;
          },
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Xác nhận mật khẩu mới",
              input: "password",
              inputAttributes: {
                autocapitalize: "off",
                autocorrect: "off",
              },
              showCancelButton: true,
              confirmButtonText: "Xác nhận",
              showLoaderOnConfirm: true,
              preConfirm: (confirmPassword) => {
                if (confirmPassword !== result.value) {
                  Swal.showValidationMessage("Mật khẩu xác nhận không khớp");
                }
                return confirmPassword;
              },
            }).then((result) => {
              if (result.isConfirmed) {
                const encryptedPassword = CryptoJS.AES.encrypt(
                  result.value,
                  "secret_key"
                ).toString();
                if (loggedInUser) {
                  const updatedUser = {
                    ...loggedInUser,
                    password: encryptedPassword,
                  };
                  saveLocal("loggedInUser", updatedUser);
                  axios
                    .put(
                      `http://localhost:8080/accounts/${loggedInUser.id}`,
                      updatedUser
                    )
                    .then(() => {
                      setLoggedInUser(updatedUser);
                      setLoading(false);
                      Swal.fire({
                        title: "Thành công!",
                        text: "Mật khẩu đã được thay đổi thành công.",
                        icon: "success",
                      });
                    })
                    .catch((error) => {
                      console.error("Error updating password:", error);
                      setLoading(false);
                      Swal.fire("Error", "Failed to update password", "error");
                    });
                }
              }
            });
          }
        });
      }
    });
  };

  return (
    <>
      <div className="private-info" id="profileContent">
        {loading && <div className="spinner"></div>}
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
                  onClick={handleChangeAvt}
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
                  onClick={() => setShowFromUpdateUser(true)}
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
                  onClick={handleChangePassword}
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
      {showFromUpdateUser && (
        <FromUpdateUser close={close} user={loggedInUser} />
      )}
    </>
  );
}
