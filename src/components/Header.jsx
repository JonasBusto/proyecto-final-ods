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
              src="https://green-cycles.com/wp-content/uploads/2021/04/ODS-ci%CC%81rculo.png"
              alt="logo_inicio_nav"
            />
          </Link>
          <a href="http://www.frt.utn.edu.ar/" target="_blank">
            <img
              className="img-fluid"
              src="https://res.cloudinary.com/dtccrvpzp/image/upload/v1699624532/Proyecto%20Final/ypdazcpvne7ifuodif7m.png"
              alt="logo_nav_utn_frt"
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
