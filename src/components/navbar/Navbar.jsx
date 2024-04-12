import React, { useContext } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import {cartContext} from "../../context/CartContext";

export default function Navbar() {
  const {isAuth} = useContext(authContext)
  const data = isAuth == "true" ? JSON.parse(localStorage.getItem("shoppify-auth")) : ""

  const { cart } = useContext(cartContext)
  
  const links = [
    {
      p_name: `Home`,
      p_icon: <i className="bi bi-house"></i>,
      p_link: "/",
    },
    {
      p_name: "Products",
      p_icon: <i className="bi bi-list-task"></i>,
      p_link: "/products",
    },
    {
      p_name: (
        <span className="nav-cart position-relative">
          Cart
          <span className="position-absolute top-2 start-100 translate-middle badge rounded-pill bg-danger">
            {cart?.length}
          </span>
        </span>
      ),
      p_icon: <i className="bi bi-cart2"></i>,
      p_link: "/cart",
    },
  ]

  return (
    <nav>
      <Link style={{ color: "black" }} to="/">
        <div className="nav-logo">
          <img src={logo} alt="logo" />
          <h3>Shoppers Stop!</h3>
        </div>
      </Link>
      <div className="nav-info">
        {links.map((el) => (
          <a href={el.p_link}>
            <p>
              {el.p_icon} {el.p_name}
            </p>
          </a>
        ))}
        {data ? (
            <a href="/user">
              <p>
                <i className="bi bi-person"></i> {data.username}
              </p>
            </a>
          ) : (
            <a href="/login">
              <p>
                <i className="bi bi-person-lock"></i> Login
              </p>
            </a>
          )}
      </div>

      <div className="mobile-nav" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
        <i className="bi bi-list"></i>
      </div>
      <div
        className="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel"></h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body-div">
          {links.map((el) => (
            <a href={el.p_link}>
              <p>
                {el.p_icon} {el.p_name}
              </p>
            </a>
          ))}
          {data ? (
            <a href="/user">
              <p>
                <i className="bi bi-person"></i> {data?.username}
              </p>
            </a>
          ) : (
            <a href="/login">
              <p>
                <i className="bi bi-person-lock"></i> Login
              </p>
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}