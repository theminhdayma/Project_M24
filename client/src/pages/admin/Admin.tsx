import { useEffect } from "react";
import "../../style/Admin.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getLocal } from "../../store/reducers/Local";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccount, logout } from "../../service/user.service";
import { User } from "../../interface";
import Swal from "sweetalert2";

export default function Admin() {
  // Lấy user
  const listAccount: User[] = useSelector((state: any) => state.user.user);
  console.log(listAccount);

  useEffect(() => {
    dispatch(getAllAccount());
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInUser = getLocal("loggedInUser");
  useEffect(() => {
    if (loggedInUser?.role === 0) {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }, []);

  //Đăng xuất
  const handleLogout = () => {
    if (loggedInUser) {
      Swal.fire({
        title: "Bạn có chắc chắn muốn đăng xuất không ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Đăng xuất",
        cancelButtonText: "Hủy",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(logout(loggedInUser.id)).then(() => {
            navigate("/");
          });
          Swal.fire("", "Đăng xuất thành công", "success");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("", "Hủy đăng xuất", "error");
        }
      });
    }
  };

  // CÁC CHỨC NĂNG CHUYỂN TAB
  useEffect(() => {
    const allSideMenu = document.querySelectorAll<HTMLAnchorElement>(
      "#sidebar .side-menu.top li a"
    );

    allSideMenu.forEach((item) => {
      const li = item.parentElement as HTMLLIElement;

      item.addEventListener("click", function () {
        allSideMenu.forEach((i) => {
          i.parentElement!.classList.remove("active");
        });
        li.classList.add("active");
      });
    });

    // TOGGLE SIDEBAR
    const menuBar = document.querySelector<HTMLDivElement>(
      "#content nav .bx.bx-menu"
    )!;
    const sidebar = document.getElementById("sidebar")!;

    menuBar.addEventListener("click", function () {
      sidebar.classList.toggle("hide");
    });

    const searchForm =
      document.querySelector<HTMLFormElement>("#content nav form")!;

    if (window.innerWidth < 768) {
      sidebar.classList.add("hide");
    } else if (window.innerWidth > 576) {
      // searchButtonIcon.classList.replace("bx-x", "bx-search");
      searchForm.classList.remove("show");
    }

    window.addEventListener("resize", function () {
      if (this.innerWidth > 576) {
        // searchButtonIcon.classList.replace("bx-x", "bx-search");
        searchForm.classList.remove("show");
      }
    });

    // const switchMode = document.getElementById(
    //   "switch-mode"
    // ) as HTMLInputElement;

    // switchMode.addEventListener("change", function () {
    //   if (this.checked) {
    //     document.body.classList.add("dark");
    //   } else {
    //     document.body.classList.remove("dark");
    //   }
    // });

    return () => {
      // Cleanup listeners if needed
      allSideMenu.forEach((item) => {
        item.removeEventListener("click", () => {});
      });
      menuBar.removeEventListener("click", () => {});
      // searchButton.removeEventListener("click", () => {});
      window.removeEventListener("resize", () => {});
      // switchMode.removeEventListener("change", () => {});
    };
  }, []);
  //CÁC CHỨC NĂNG CHUYỂN TAB

  return (
    <>
      <div className="body">
        {/* SIDEBAR */}
        <section id="sidebar">
          <Link to={"/admin"} className="brand">
            <i className="bx bxs-smile" />
            <span className="text">AdminHub</span>
          </Link>
          <ul className="side-menu top">
            <li className="active">
              <Link to={"/admin"}>
                <i className="bx bxs-dashboard" />
                <span className="text">Quản lý Người dùng</span>
              </Link>
            </li>
            <li>
              <Link to={"/admin/product"}>
                <i className="bx bxs-shopping-bag-alt" />
                <span className="text">Quản lý sản phẩm</span>
              </Link>
            </li>
            <li>
              <Link to={"/admin/revenue"}>
                <i className="bx bxs-doughnut-chart" />
                <span className="text">Quản Lý doanh thu</span>
              </Link>
            </li>
            <li>
              <Link to={"/admin/category"}>
                <i className="bx bxs-doughnut-chart" />
                <span className="text">Quản Lý danh mục</span>
              </Link>
            </li>
          </ul>
          <ul className="side-menu">
            <li>
              <Link to={"/"} className="logout">
                <i className="bx bxs-log-out-circle text-3xl text-green-500" />
                <span className="text text-3xl text-green-500">Home</span>
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout">
                <i className="bx bxs-log-out-circle text-3xl" />
                <span className="text text-3xl">Logout</span>
              </button>
            </li>
          </ul>
        </section>
        {/* SIDEBAR */}
        {/* CONTENT */}
        <section id="content">
          {/* NAVBAR */}
          <nav>
            <i className="bx bx-menu" />
            <form></form>
            <Link
              to={`/profile/${loggedInUser.id}`}
              className="mr-7 flex justify-center items-center gap-2"
            >
              <p>{loggedInUser.name}</p>
              {loggedInUser.image === "" ? (
                <img
                  className="w-9 h-9 object-cover rounded-full"
                  src="https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
                  alt={loggedInUser.name}
                />
              ) : (
                <img
                  className="w-9 h-9 object-cover rounded-full"
                  src={loggedInUser.image}
                  alt={loggedInUser.name}
                />
              )}
            </Link>
          </nav>
          {/* NAVBAR */}
          {/* MAIN */}
          <main>
            <div className="table-data">
              <Outlet />
            </div>
          </main>
          {/* MAIN */}
        </section>
        {/* CONTENT */}
      </div>
    </>
  );
}
