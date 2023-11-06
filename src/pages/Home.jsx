import React from "react";
import ods from "../helpers/ods";

import ODScard from "../components/ODScard";
import "../styles/home.css";

const Home = () => {
  const colores = ["red", "blue", "orange", "green", "yellow", "purple"];

  return (
    <div>
      <div className="titulo">
        <p>Progreso en ODS de la STD</p>
      </div>
      <div className="row m-0">
        {ods.map((o) => (
          <ODScard
            key={o.id}
            o={o}
            cols={"col-6 col-md-4 col-lg-2"}
            color={colores[Math.floor(Math.random() * (colores.length - 1))]}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
