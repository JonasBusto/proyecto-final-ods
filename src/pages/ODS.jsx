import React from "react";
import { useParams } from "react-router-dom";
import ods from "../helpers/ods";
import "../styles/ods.css";
import ODScard from "../components/ODScard";

const ODS = () => {
  const { id } = useParams();
  const odsObjeto = ods.filter((o) => o.id == id)[0];

  return (
    <div>
      <div className="titulo">
        <p>{"ODS " + odsObjeto.id + ": " + odsObjeto.nombre}</p>
      </div>
      <div className="row m-0">
        <ODScard
          color={"red"}
          o={odsObjeto}
          cols={"col-10 col-md-4"}
          style={{ margin: "0 auto" }}
        />
        <div className="col-12 col-md-8 ods-contain-info">
          <div>
            <table></table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ODS;
