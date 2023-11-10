import React from "react";
import "../styles/sobreOds.css";
import ods from "../helpers/ods";
import { Link } from "react-router-dom";

const SobreODS = () => {
  return (
    <div style={{ marginBottom: "3rem" }}>
      <p hidden>
        https://www.bbva.com/es/sostenibilidad/que-sabes-de-los-objetivos-de-desarrollo-sostenible-ods/
      </p>
      <div className="d-flex flex-column">
        <div>
          <p className="titulo-sobre-ods">Conoco que son los ODS</p>
          <div className="desc-sobre-ods">
            <p>
              Con los 17 ODS se buscó involucrar a gobiernos, empresas, sociedad
              civil y también a las personas a título individual. Dentro de cada
              objetivo se trazan diferentes metas y cada una de ellas cuenta con
              sus propios indicadores que sirven para determinar si el objetivo
              se cumple o no. Dentro del conjunto de ODS se encuentran aquellos
              objetivos enfocados en el avance de energía limpia, el trabajo
              decente y el crecimiento económico, el consumo y la producción
              responsable, la acción contra el clima o la industria, y los
              orientados a la innovación e infraestructura.
            </p>
          </div>
        </div>
        <div>
          <p className="titulo-sobre-ods">¿Qué son los ODS?</p>
          <div className="desc-sobre-ods">
            <p>
              Los 17 Objetivos de Desarrollo Sostenible (ODS) son medidas
              adoptadas por los líderes mundiales para proteger el planeta,
              luchar contra la pobreza y tratar de erradicarla con el objetivo
              de construir un mundo más próspero, justo y sostenible para las
              generaciones futuras. Estos objetivos se fijaron dentro de la
              Agenda 2030 sobre el desarrollo sostenible.
            </p>
          </div>
        </div>
        <div>
          <p className="titulo-sobre-ods">¿Cuáles son los ODS?</p>
          <div>
            <ul>
              {ods.map((o) => (
                <li key={o.id}>{o.nombre}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="contain-info-sobre-ods d-flex flex-column align-items-center">
          {ods.map((o) => (
            <div key={o.id} className="d-flex">
              <div className="contain-img-sobre-ods">
                <img className="img-fluid" src={o.imagen} alt="" />
              </div>
              <div className="cuerpo-card-sobre-ods">
                <p className="titulo-card-sobre-ods">
                  {o.nombre}
                  <Link to={"/ods/" + o.id}>Ver detalles</Link>
                </p>
                <p className="desc-card-sobre-ods">{o.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <p className="titulo-sobre-ods">Fruto de un consenso global</p>
          <div className="desc-sobre-ods">
            <p>
              Los ODS tomaron el relevo de los Objetivos de Desarrollo del
              Milenio (ODM), vigentes entre 2000 y 2015. A diferencia de sus
              predecesores, se fueron perfilando con aportaciones
              multidisciplinares de todo el mundo mediante una consulta global a
              científicos, académicos, el sector privado y ciudadanos en
              general. Su desarrollo comenzó en la Conferencia sobre Desarrollo
              Sostenible Río+20 (2012) y entraron en vigor oficialmente el 1 de
              enero de 2016.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SobreODS;
