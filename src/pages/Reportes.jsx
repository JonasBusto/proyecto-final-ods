import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import ods from "../helpers/ods";
import "../styles/reportes.css";

const Reportes = () => {
  const arrayData = [540, 325, 702, 620];

  console.log(ods);

  function generarColores(array) {
    const coloresRGB = [];
    for (let i = 0; i < array.length; i++) {
      coloresRGB.push(
        "rgb(" +
          Math.floor(Math.random() * 255) +
          ", " +
          Math.floor(Math.random() * 255) +
          ", " +
          Math.floor(Math.random() * 255) +
          ", " +
          0.8 +
          ")"
      );
    }

    return coloresRGB;
  }

  const data = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Sales",
        data: ods.nombre,
        backgroundColor: generarColores(arrayData),
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <div className="titulo">
        <p>Reportes</p>
      </div>
      <div>
        <Chart type="bar" data={data} options={options} />
      </div>
    </div>
  );
};

export default Reportes;
