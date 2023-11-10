import React from "react";
import { Link } from "react-router-dom";
const ODScard = ({ o, color, cols, style }) => {
  return (
    <div className={cols + " d-flex flex-column ods-contain"} style={style}>
      <Link style={{ margin: "0.4rem", marginTop: "1rem" }} to={"/ods/" + o.id}>
        <div className="contain-img-card-ods">
          <div>
            <p>{o.progreso}%</p>
          </div>
          <img className="img-fluid" src={o.imagen} alt="" />
        </div>
        <div className="ods-progreso">
          <div
            style={{
              width: o.progreso + "%",
              backgroundColor: color,
            }}
          ></div>
        </div>
      </Link>
    </div>
  );
};

export default ODScard;
