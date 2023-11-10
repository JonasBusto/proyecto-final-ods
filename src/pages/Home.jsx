import React, { useState, useEffect } from "react";
import ods from "../helpers/ods";

import ODScard from "../components/ODScard";
import "../styles/home.css";

const Home = () => {
  const colores = ["red", "yellow", "green", "#16FF00"];

  return (
    <div style={{ marginBottom: "3rem" }}>
      <div className="titulo" style={{ marginTop: "4rem" }}>
        <p>Progreso en ODS de la STD</p>
      </div>
      <div className="row m-0">
        {ods.map((o) => (
          <ODScard
            key={o.id}
            o={o}
            cols={"col-6 col-md-4 col-lg-2"}
            color={
              (Number(o.progreso) >= 0 &&
                Number(o.progreso) <= 33 &&
                colores[0]) ||
              (Number(o.progreso) >= 34 &&
                Number(o.progreso) <= 66 &&
                colores[1]) ||
              (Number(o.progreso) >= 66 &&
                Number(o.progreso) <= 99 &&
                colores[2]) ||
              (Number(o.progreso) == 100 && colores[3])
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
