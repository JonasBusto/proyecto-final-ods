import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import ods from "../helpers/ods";
import "../styles/reportes.css";

const Reportes = () => {
  const arrayData = [540, 325, 702, 620];

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
    labels: ods.map((o) => o.nombre),
    datasets: [
      {
        label: "Porcentaje cumplido de ODS",
        data: ods.map((o) => o.progreso),
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
        <div className="row m-0">
          <div className="col-12 col-md-6 ">
            <Chart
              type="bar"
              data={{
                labels: ods.map((o) => o.nombre),
                datasets: [
                  {
                    label: "Porcentaje cumplido de ODS",
                    data: ods.map((o) => o.progreso),
                    backgroundColor: generarColores(arrayData),
                  },
                ],
              }}
              options={{
                indexAxis: "y",
                aspectRatio: 1.1,
              }}
            />
          </div>
          <div className="col-12 col-md-6 ">
            <Chart
              type="doughnut"
              data={{
                labels: ods.map((o) => o.nombre),
                datasets: [
                  {
                    label: "Porcentaje cumplido de ODS",
                    data: ods.map((o) => o.progreso),
                    backgroundColor: generarColores(arrayData),
                  },
                ],
              }}
              options={{
                indexAxis: "y",
                aspectRatio: 1.1,
              }}
            />
          </div>
          <div className="col-12 col-md-6 ">
            <Chart
              type="pie"
              data={{
                labels: ods.map((o) => o.nombre),
                datasets: [
                  {
                    label: "Porcentaje cumplido de ODS",
                    data: ods.map((o) => o.progreso),
                    backgroundColor: generarColores(arrayData),
                  },
                ],
              }}
              options={{
                indexAxis: "y",
                aspectRatio: 1.1,
              }}
            />
          </div>
          <div className="col-12 col-md-6">
            <Chart
              type="line"
              data={{
                labels: ods.map((o) => o.nombre),
                datasets: [
                  {
                    label: "Porcentaje cumplido de ODS",
                    data: ods.map((o) => o.progreso),
                    backgroundColor: generarColores(arrayData),
                  },
                ],
              }}
              options={{
                indexAxis: "y",
                aspectRatio: 1.1,
              }}
            />
          </div>
          <div className="col-12 col-md-6 ">
            <Chart
              type="polarArea"
              data={{
                labels: ods.map((o) => o.nombre),
                datasets: [
                  {
                    label: "Porcentaje cumplido de ODS",
                    data: ods.map((o) => o.progreso),
                    backgroundColor: generarColores(arrayData),
                  },
                ],
              }}
              options={{
                indexAxis: "y",
                aspectRatio: 1.1,
              }}
            />
          </div>
          <div className="col-12 col-md-6 ">
            <Chart
              type="radar"
              data={{
                labels: ods.map((o) => o.nombre),
                datasets: [
                  {
                    label: "Porcentaje cumplido de ODS",
                    data: ods.map((o) => o.progreso),
                    backgroundColor: generarColores(arrayData),
                  },
                ],
              }}
              options={{
                indexAxis: "y",
                aspectRatio: 1.1,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reportes;
