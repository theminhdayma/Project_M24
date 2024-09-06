import { Link, useNavigate } from "react-router-dom";
import "../../style/Login.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccount, login } from "../../service/user.service";
import { User } from "../../interface";
import CryptoJS from "crypto-js";

export default function Login() {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  // Kiểm tra lỗi
  const [checkEmail, setCheckEmail] = useState<boolean>(false);
  const [checkHollow, setCheckHollow] = useState<boolean>(false);
  const [checkPassword, setCheckPassword] = useState<boolean>(false);
  const [checkAccount, setCheckAccount] = useState<boolean>(false);
  const [checkComfimPassword, setCheckComfimPassword] =
    useState<boolean>(false);
  const [checkUseEmail, setCheckUseEmail] = useState<boolean>(false);

  const listAccount: User[] = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllAccount());
  }, [dispatch]);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue.email || !inputValue.password) {
      setCheckHollow(true);
      return;
    } else {
      setCheckHollow(false);
    }

    if (!validateEmail(inputValue.email)) {
      setCheckEmail(true);
      return;
    } else {
      setCheckEmail(false);
    }

    if (inputValue.password.length < 8) {
      setCheckPassword(true);
      return;
    } else {
      setCheckPassword(false);
    }

    const user = listAccount.find((user) => user.email === inputValue.email);
    if (user) {
      const bytes = CryptoJS.AES.decrypt(user.password, "secret_key");
      const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

      if (decryptedPassword !== inputValue.password) {
        setCheckComfimPassword(true);
        return;
      } else {
        setCheckComfimPassword(false);
      }

      if (user.status !== true) {
        setCheckAccount(true);
        return;
      } else {
        setCheckAccount(false);
      }

      dispatch(login(user.id)).then(() => {
        navigate("/");
        setInputValue({
          email: "",
          password: "",
        });
      });
      setCheckAccount(false);
      swal("Đăng nhập thành công", "", "success");
    } else {
      setCheckUseEmail(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="body1">
      <div className="login">
        <div className="logo">
          <i className="bx bx-user-circle" />
          <h2>Đăng Nhập</h2>
        </div>
        {checkHollow && (
          <p className="text-red-700">Vui lòng điền đầy đủ thông tin</p>
        )}
        {checkAccount && <p className="text-red-700">Tài khoản đã bị cấm</p>}
        <form onSubmit={handleSubmit}>
          <div className="input_box">
            <span>Email</span>
            <div className="icon">
              <i className="bx bxs-email" />
              <input
                type="text"
                name="email"
                value={inputValue.email}
                onChange={handleChange}
                placeholder="Enter Email"
              />
            </div>
            {checkUseEmail && (
              <p className="text-red-700">Email chưa tồn tại</p>
            )}
            {checkEmail && (
              <p className="text-red-700">Email không đúng định dạng</p>
            )}
          </div>
          <div className="input_box">
            <span>Password</span>
            <div className="icon">
              <i className="bx bxs-lock-alt" />
              <input
                type="password"
                name="password"
                value={inputValue.password}
                onChange={handleChange}
                placeholder="Enter Password"
              />
            </div>
            {checkComfimPassword && (
              <p className="text-red-700">Mật khẩu không chính xác</p>
            )}
            {checkPassword && (
              <p className="text-red-700">Mật khẩu phải đủ 8 ký tự trở lên</p>
            )}
          </div>
          <button type="submit">Đăng Nhập</button>
          <p className="signup">Or Sign Up Using</p>
          <div className="social_icon">
            <a href="#" id="facebook">
              <i className="bx bxl-facebook" />
            </a>
            <a href="#" id="twitter">
              <i className="bx bxl-twitter" />
            </a>
            <a href="#" id="google">
              <i className="bx bxl-google" />
            </a>
            <a href="#" id="github">
              <i className="bx bxl-github" />
            </a>
          </div>
          <div className="alreadyAccount">
            <p>
              Don't have an account? <Link to="/register">Đăng Ký</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
