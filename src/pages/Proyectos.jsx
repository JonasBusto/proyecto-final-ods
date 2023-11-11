import React, { useState } from "react";
import "../styles/proyectos.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import proyectos from "../helpers/proyectos";
import ods from "../helpers/ods";
import objetivos from "../helpers/objetivos";
import ODScard from "../components/ODScard";

const Proyectos = () => {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const colores = ["red", "yellow", "green", "#16FF00"];
  const accion = (proyecto_ods) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <div>
        <div className="btn-acciones btn-accciones-proyecto">
          <button onClick={handleShow}>Ver</button>
        </div>
      </div>
    );
  };

  return (
    <div className="main-proyectos" style={{ marginBottom: "3rem" }}>
      <div className="titulo">
        <p>Proyectos en Curso</p>
      </div>
      <div className="row m-0">
        <div className="col-12 col-lg-4 contain-proyectos ods-contain-info">
          <div>
            <div className="d-flex flex-column align-items-center justify-content-between p-3 w-100 contain-input-search">
              <InputText
                placeholder="Buscar Proyecto"
                onInput={(e) => {
                  setFilters({
                    global: {
                      value: e.target.value,
                      matchMode: FilterMatchMode.CONTAINS,
                    },
                  });
                }}
              />
            </div>
            <DataTable
              className="datatable-custom"
              paginator
              removableSort
              selectionMode="single"
              filters={filters}
              scrollable
              rows={5}
              emptyMessage="Sin resultados"
              rowsPerPageOptions={[5, 10, 25, 50]}
              value={proyectos}
            >
              <Column
                field="nombre"
                header="Proyecto"
                style={{ minWidth: "250px" }}
              ></Column>
              {/* <Column
                header="Acción"
                body={accion}
                style={{ minWidth: "100px" }}
              ></Column> */}
            </DataTable>
          </div>
        </div>
        <div className="col col-lg-8 contain-info-proyectos">
          <div className="d-flex flex-column pb-3">
            <div className="titulo-proyecto-selec">
              <p>Proyecto 1</p>
            </div>
            <div>
              <div className="row m-0">
                <div className="col-12 col-lg-5 p-0">
                  <div className="row m-0">
                    {ods.map(
                      (o) =>
                        o.id <= 4 && (
                          <ODScard
                            key={o.id}
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
                            o={o}
                            cols={"col-12 col-lg-6"}
                            style={{ margin: "0 auto" }}
                          />
                        )
                    )}
                  </div>
                </div>
                <div className="col-12 col-lg-7 ods-contain-info">
                  <div>
                    <div className="d-flex flex-column align-items-center justify-content-between p-3 w-100 contain-input-search">
                      <InputText
                        placeholder="Buscar Objetivo del Proyecto"
                        onInput={(e) => {
                          setFilters({
                            global: {
                              value: e.target.value,
                              matchMode: FilterMatchMode.CONTAINS,
                            },
                          });
                        }}
                      />
                    </div>
                    <DataTable
                      className="datatable-custom"
                      paginator
                      removableSort
                      selectionMode="single"
                      filters={filters}
                      scrollable
                      rows={5}
                      emptyMessage="Sin resultados"
                      rowsPerPageOptions={[5, 10, 25, 50]}
                      value={objetivos}
                    >
                      <Column
                        field="asunto"
                        header="Objetivo"
                        style={{ minWidth: "250px" }}
                      ></Column>
                      <Column
                        header="Acción"
                        body={accion}
                        style={{ minWidth: "100px" }}
                      ></Column>
                    </DataTable>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proyectos;
