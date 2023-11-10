import React from "react";
import NavPage from "./NavPage";
import { Link } from "react-router-dom";
import "../styles/header.css";

const Header = () => {
  return (
    <header>
      <div className="header-main">
        <div className="d-flex justify-content-between align-items-center first-nav">
          <Link to="/">
            <img
              className="img-fluid"
              src="https://knauf-industries.es/wp-content/uploads/CABECERA-CIRCULO-ODS-1200x1200.jpg"
              alt=""
            />
          </Link>
          <a href="http://www.frt.utn.edu.ar/" target="_blank">
            <img
              className="img-fluid"
              src="http://www.frt.utn.edu.ar/2017/img/logo.png"
              alt=""
            />
          </a>
        </div>
      </div>
      <div className="nav-custom-div">
        <NavPage />
      </div>
    </header>
  );
};

export default Header;
