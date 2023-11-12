import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import ods from "../helpers/ods";
import objetivos from "../helpers/objetivos";
import proyectos from "../helpers/proyectos";
import "../styles/reportes.css";

const Reportes = () => {
  const arrayData = [540, 325, 702, 620];
  const [filtrarPor, setFiltrarPor] = useState("");

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
          <div className="col-12 select-filtro d-flex flex-column align-items-center my-3">
            <label htmlFor="filtro-por">Filtrar por: </label>
            <select
              name="filtro-por"
              id="filtro-por"
              onChange={(e) => setFiltrarPor(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="ods">ODS</option>
              <option value="objetivos">Objetivos</option>
              <option value="proyectos">Proyectos</option>
            </select>
          </div>
        </div>
        <div className="row m-0">
          {(filtrarPor === "" || filtrarPor === "ods") && (
            <div className="col-12 col-md-6 ">
              <Chart
                type="bar"
                data={{
                  labels: ods.map((o) => o.nombre),
                  datasets: [
                    {
                      label: "Porcentaje cumplido de ODS [%]",
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
          )}
          {(filtrarPor === "" || filtrarPor === "objetivos") && (
            <div className="col-12 col-md-6 ">
              <Chart
                type="doughnut"
                data={{
                  labels: objetivos.map((o) => o.asunto),
                  datasets: [
                    {
                      label: "Porcentaje cumplido del Objetivo [%]",
                      data: objetivos.map((o) => o.realizado),
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
          )}
          {(filtrarPor === "" || filtrarPor === "proyectos") && (
            <div className="col-12 col-md-6">
              <Chart
                type="pie"
                data={{
                  labels: proyectos.map((o) => o.nombre),
                  datasets: [
                    {
                      label: "Objetivos por Proyectos",
                      data: proyectos.map(
                        (o) => o.custom_fields[0].value.length
                      ),
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
          )}
          {(filtrarPor === "" || filtrarPor === "objetivos") && (
            <div className="col-12 col-md-6">
              <Chart
                type="polarArea"
                data={{
                  labels: objetivos.map((o) => o.asunto),
                  datasets: [
                    {
                      label: "ODS por Objetivos",
                      data: objetivos.map(
                        (o) => o.custom_fields[0].value.length
                      ),
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
          )}
          {(filtrarPor === "" || filtrarPor === "ods") && (
            <div className="col-12 col-md-6 ">
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
          )}
          {(filtrarPor === "" || filtrarPor === "ods") && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Reportes;
