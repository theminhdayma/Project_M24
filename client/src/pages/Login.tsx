import { Link, useNavigate } from "react-router-dom";
import "../style/Login.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccount, login } from "../service/user.service";
import { User } from "../interface";

export default function Login() {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

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
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (!validateEmail(inputValue.email)) {
      setError("Email không đúng định dạng.");
      return;
    }

    if (inputValue.password.length < 8) {
      setError("Mật khẩu phải từ 8 ký tự trở lên.");
      return;
    }

    const user = listAccount.find(
      (user) =>
        user.email === inputValue.email && user.password === inputValue.password
    );
    
    if (!user) {
      setError("Email hoặc mật khẩu không chính xác.");
      return;
    }

    dispatch(login(user.id));
    navigate("/");
    setInputValue({
      email: "",
      password: "",
    });
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
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-700">{error}</p>}
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
          </div>
          <button type="submit">Đăng Nhập</button>
          <p className="signup">Or Sign In Using</p>
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
              Already have an account? <Link to={"/register"}>Đăng Ký</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}