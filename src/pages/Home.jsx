import React, { useState, useEffect } from "react";
import ods from "../helpers/ods";

import ODScard from "../components/ODScard";
import "../styles/home.css";

const Home = () => {
  const colores = ["red", "blue", "orange", "green", "yellow", "purple"];

  // const [apiQosqo, setApiQosqo] = useState([]);

  // useEffect(() => {
  //   var requestOptions = {
  //     method: "GET",
  //     mode: "cors",
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT, OPTIONS, HEAD",
  //       "Access-Control-Max-Age": 0,
  //       // "Access-Control-Allow-Headers": "*",
  //       "Access-Control-Allow-Credentials": true,
  //       "X-Rack-CORS": "hit",
  //       "X-Redmine-API-Key": "2012f6129155973b74e397477b5ee37b40fca0de",
  //     },
  //     redirect: "follow",
  //   };

  //   fetch(
  //     "https://qosqo.frt.utn.edu.ar/projects/ir2013g1/issues.json",
  //     requestOptions
  //   )
  //     .then((response) => response.json())
  //     .then((result) => console.log(result))
  //     .catch((error) => console.log("error", error));
  // }, []);

  // useEffect(() => {
  //   console.log(apiQosqo);
  // }, [apiQosqo]);

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
