import { useEffect, useState } from "react";
import "../../style/Admin.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { User } from "../../interface";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccount } from "../../service/user.service";

export default function Admin() {
  const listUser: User[] = useSelector((state: any) => state.user.user);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllAccount());
  }, []);

  useEffect(() => {
    const user = listUser.find((user: User) => user.status === true);
    if (user?.role === 0) {
      navigate("/admin");
    } else {
      navigate("/")
    }
  }, []);
  

  
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

    const searchButton = document.querySelector<HTMLButtonElement>(
      "#content nav form .form-input button"
    )!;
    const searchButtonIcon = document.querySelector<HTMLSpanElement>(
      "#content nav form .form-input button .bx"
    )!;
    const searchForm =
      document.querySelector<HTMLFormElement>("#content nav form")!;

    searchButton.addEventListener("click", function (e) {
      if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle("show");
        if (searchForm.classList.contains("show")) {
          searchButtonIcon.classList.replace("bx-search", "bx-x");
        } else {
          searchButtonIcon.classList.replace("bx-x", "bx-search");
        }
      }
    });

    if (window.innerWidth < 768) {
      sidebar.classList.add("hide");
    } else if (window.innerWidth > 576) {
      searchButtonIcon.classList.replace("bx-x", "bx-search");
      searchForm.classList.remove("show");
    }

    window.addEventListener("resize", function () {
      if (this.innerWidth > 576) {
        searchButtonIcon.classList.replace("bx-x", "bx-search");
        searchForm.classList.remove("show");
      }
    });

    const switchMode = document.getElementById(
      "switch-mode"
    ) as HTMLInputElement;

    switchMode.addEventListener("change", function () {
      if (this.checked) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    });

    return () => {
      // Cleanup listeners if needed
      allSideMenu.forEach((item) => {
        item.removeEventListener("click", () => {});
      });
      menuBar.removeEventListener("click", () => {});
      searchButton.removeEventListener("click", () => {});
      window.removeEventListener("resize", () => {});
      switchMode.removeEventListener("change", () => {});
    };
  }, []);
  //CÁC CHỨC NĂNG CHUYỂN TAB

  return (
    <>
      <div className="body">
        {/* SIDEBAR */}
        <section id="sidebar">
          <a href="#" className="brand">
            <i className="bx bxs-smile" />
            <span className="text">AdminHub</span>
          </a>
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
          </ul>
          <ul className="side-menu">
            <li>
              <a href="#" className="logout">
                <i className="bx bxs-log-out-circle text-3xl" />
                <span className="text text-3xl">Logout</span>
              </a>
            </li>
          </ul>
        </section>
        {/* SIDEBAR */}
        {/* CONTENT */}
        <section id="content">
          {/* NAVBAR */}
          <nav>
            <i className="bx bx-menu" />
            <a href="#" className="nav-link">
              Categories
            </a>
            <form action="#">
              <div className="form-input">
                <input type="search" placeholder="Search..." />
                <button type="submit" className="search-btn">
                  <i className="bx bx-search" />
                </button>
              </div>
            </form>
            <input type="checkbox" id="switch-mode" />
            <label htmlFor="switch-mode" className="switch-mode" />
            <a href="#" className="notification">
              <i className="bx bxs-bell" />
              <span className="num">8</span>
            </a>
            <a href="#" className="profile">
              <img src="https://firebasestorage.googleapis.com/v0/b/projectreact-dd427.appspot.com/o/7b42ef2c-5724-4e1c-abe2-a4017fc4ec1a.jpg?alt=media&token=fce0967e-11f4-4d4e-9dfd-cdc4e91759e9" />
            </a>
          </nav>
          {/* NAVBAR */}
          {/* MAIN */}
          <main>
            <div className="head-title">
              <div className="left">
                <h1>Dashboard</h1>
                <ul className="breadcrumb">
                  <li>
                    <a href="#">Dashboard</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right" />
                  </li>
                  <li>
                    <a className="active" href="#">
                      Home
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <ul className="box-info">
              <li>
                <i className="bx bxs-calendar-check" />
                <span className="text">
                  <h3>1020</h3>
                  <p>Order</p>
                </span>
              </li>
              <li>
                <i className="bx bxs-group" />
                <span className="text">
                  <h3>2834</h3>
                  <p>Visitors</p>
                </span>
              </li>
              <li>
                <i className="bx bxs-dollar-circle" />
                <span className="text">
                  <h3>$2543</h3>
                  <p>Total Sales</p>
                </span>
              </li>
            </ul>
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
