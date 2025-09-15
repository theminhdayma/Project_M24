import { Link, useNavigate } from "react-router-dom";
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
    <div className="bg-white min-h-screen">
      <main>
        <div className="container py-10">
          <div className="mx-auto max-w-md card p-6">
            <div className="flex items-center gap-2 mb-4">
              <i className="bx bx-user-circle text-2xl" />
              <h2 className="text-xl font-display">Đăng Nhập</h2>
            </div>
            {checkHollow && (
              <p className="text-red-700 mb-2">Vui lòng điền đầy đủ thông tin</p>
            )}
            {checkAccount && <p className="text-red-700 mb-2">Tài khoản đã bị cấm</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="flex flex-col gap-2">
                <span className="text-sm text-ink-700">Email</span>
                <div className="flex items-center gap-2 rounded-md border border-ink-300 px-3 py-2 focus-within:ring-2 focus-within:ring-brand-400">
                  <i className="bx bxs-email" />
                  <input
                    className="flex-1 outline-none"
                    type="text"
                    name="email"
                    value={inputValue.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                  />
                </div>
                {checkUseEmail && (
                  <p className="text-red-700 text-sm">Email chưa tồn tại</p>
                )}
                {checkEmail && (
                  <p className="text-red-700 text-sm">Email không đúng định dạng</p>
                )}
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm text-ink-700">Password</span>
                <div className="flex items-center gap-2 rounded-md border border-ink-300 px-3 py-2 focus-within:ring-2 focus-within:ring-brand-400">
                  <i className="bx bxs-lock-alt" />
                  <input
                    className="flex-1 outline-none"
                    type="password"
                    name="password"
                    value={inputValue.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                  />
                </div>
                {checkComfimPassword && (
                  <p className="text-red-700 text-sm">Mật khẩu không chính xác</p>
                )}
                {checkPassword && (
                  <p className="text-red-700 text-sm">Mật khẩu phải đủ 8 ký tự trở lên</p>
                )}
              </label>
              <button type="submit" className="btn-primary w-full py-2">Đăng Nhập</button>
              <p className="text-center text-sm text-ink-600">Hoặc đăng nhập bằng</p>
              <div className="flex justify-center items-center gap-3 text-ink-700">
                <a href="#" id="facebook"><i className="bx bxl-facebook text-xl" /></a>
                <a href="#" id="twitter"><i className="bx bxl-twitter text-xl" /></a>
                <a href="#" id="google"><i className="bx bxl-google text-xl" /></a>
                <a href="#" id="github"><i className="bx bxl-github text-xl" /></a>
              </div>
              <div className="text-center text-sm">
                <p>
                  Don't have an account? <Link className="text-brand-700" to="/register">Đăng Ký</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
