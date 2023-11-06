import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="mt-auto d-flex justify-content-center align-items-center">
      <p>Proyecto Final - {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
