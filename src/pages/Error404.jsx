import React from "react";
import { Link } from "react-router-dom";
import "../styles/error404.css";

const Error404 = () => {
  return (
    <div
      className="contain-error-404 d-flex flex-column align-items-center"
      style={{ margin: "3.5rem 0" }}
    >
      <p>Error 404</p>
      <p className="desc-error-404">
        <u>Pagina no encontrada:</u> La ruta a la que intenta acceder no existe
        o no esta disponible.
      </p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
};

export default Error404;
