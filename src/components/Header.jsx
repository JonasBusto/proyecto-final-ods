import React from "react";
import NavPage from "./NavPage";
import "../styles/header.css";

const Header = () => {
  return (
    <header>
      <div className="header-main">
        <div className="d-flex justify-content-between align-items-center mt-3">
          <p>Proyecto final</p>
          <img
            src="https://site.ieee.org/sb-unt/files/2018/10/UTN-FRT-1-300x116.png"
            alt=""
          />
        </div>
      </div>
      <div className="nav-custom-div">
        <NavPage />
      </div>
    </header>
  );
};

export default Header;
