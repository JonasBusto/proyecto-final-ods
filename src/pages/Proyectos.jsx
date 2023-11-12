import React, { useState, useEffect } from "react";
import "../styles/proyectos.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import proyectos from "../helpers/proyectos";
import ods from "../helpers/ods";
import objetivos from "../helpers/objetivos";
import ODScard from "../components/ODScard";
import Modal from "react-bootstrap/Modal";

const Proyectos = () => {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [filtersObj, setFiltersObj] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [mostrar, setMostrar] = useState(false);
  const [objetivosArray, setObjetivosArray] = useState([]);
  const [odsArray, setOdsArray] = useState([]);
  const [odsPorObjArray, setOdsPorObjArray] = useState([]);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [seleccionarProyecto, setSeleccionarProyecto] = useState(null);
  const [metaKey, setMetaKey] = useState(true);

  const mostrarInfoProyecto = (proyecto) => {
    buscarObjetivosYods(proyecto);
  };

  const colores = ["red", "yellow", "green", "#16FF00"];

  const buscarObjetivosYods = (proyecto) => {
    let arrayAux = [];

    for (let i = 0; i < proyecto.custom_fields[0].value.length; i++) {
      for (let j = 0; j < objetivos.length; j++) {
        if (proyecto.custom_fields[0].value[i] == objetivos[j].id) {
          arrayAux.push(objetivos[j]);
          break;
        }
      }
    }

    setProyectoSeleccionado({ ...proyecto });
    setObjetivosArray([...arrayAux]);

    return objetivosArray;
  };

  const nombreProyecto = (proyecto) => {
    return (
      <span onClick={() => mostrarInfoProyecto(proyecto)}>
        {proyecto.nombre}
      </span>
    );
  };

  const nombreProyectoField = (proyecto) => {
    return proyecto.nombre;
  };

  const accion = (objetivo) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <div>
        <span className="color-obj-modal" onClick={handleShow}>
          {objetivo.asunto} <i className="fa-solid fa-share"></i>
        </span>
        <Modal
          className="modal-custom-accion modal-objetivo-proyecto"
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>{"Detalle del objetivo"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <b>Objetivo:</b> {objetivo.asunto}
            </p>
            <p>
              <b>Progreso actual:</b> {objetivo.realizado + "%"}
            </p>
            <p>
              <b>ODS asociados:</b>{" "}
            </p>
            <ul>
              {objetivo.custom_fields[0].value.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <div className="btn-acciones">
              <button onClick={handleClose}>Cerrar</button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  const buscarOdsPorObjetivo = (objetivo) => {
    let auxArray = [];

    for (let i = 0; i < objetivo.custom_fields[0].value.length; i++) {
      for (let j = 0; j < ods.length; j++) {
        if (
          ods[j].nombre.toLowerCase() ==
          objetivo.custom_fields[0].value[i].toLowerCase()
        ) {
          auxArray.push(ods[j]);
        }
      }
    }

    return (
      <div className="d-flex contain-img-table-p-j">
        {auxArray.map((o) => (
          <ODScard
            key={o.id}
            mostrarProgreso={false}
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
            cols={""}
            style={{ margin: "0" }}
          />
        ))}
      </div>
    );

    console.log(auxArray);
  };

  const nombreField = (objetivo) => {
    return objetivo.asunto;
  };

  const progresoTable = (objetivo) => {
    return <span>{objetivo.realizado + "%"}</span>;
  };

  useEffect(() => {
    let arrayAux = [];

    for (let i = 0; i < objetivosArray.length; i++) {
      for (
        let j = 0;
        j < objetivosArray[i].custom_fields[0].value.length;
        j++
      ) {
        for (let k = 0; k < ods.length; k++) {
          if (
            ods[k].nombre.toLowerCase() ==
            objetivosArray[i].custom_fields[0].value[j].toLowerCase()
          ) {
            arrayAux.push(ods[k]);
            break;
          }
        }
      }
    }

    let hash = {};
    arrayAux = arrayAux.filter((o) =>
      hash[o.id] ? false : (hash[o.id] = true)
    );

    setOdsArray([...arrayAux]);
  }, [objetivosArray]);

  return (
    <div className="main-proyectos" style={{ marginBottom: "3rem" }}>
      <div className="titulo">
        <p>Proyectos en Curso</p>
      </div>
      <div className="row m-0">
        <div className="col-12 col-lg-3 contain-proyectos ods-contain-info">
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
              className="datatable-custom datatable-proyectos"
              paginator
              removableSort
              selectionMode="single"
              selection={seleccionarProyecto}
              onSelectionChange={(e) => setSeleccionarProyecto(e.value)}
              dataKey="id"
              metaKeySelection={metaKey}
              filters={filters}
              scrollable
              rows={5}
              emptyMessage="Sin resultados"
              // rowsPerPageOptions={[5, 10, 25, 50]}
              value={proyectos}
            >
              <Column
                body={nombreProyecto}
                field={nombreProyectoField}
                header="Nombre del Proyecto"
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
        <div className="col col-lg-9 contain-info-proyectos">
          <div className="d-flex flex-column pb-3">
            <div className="titulo-proyecto-selec">
              <p>
                {proyectoSeleccionado
                  ? proyectoSeleccionado.nombre
                  : "Sin proyecto seleccionado"}
              </p>
            </div>
            {objetivosArray.length !== 0 && (
              <div>
                <div className="row m-0">
                  <div className="col-12 col-lg-4 col-xxl-3 p-0">
                    <div className="row m-0">
                      <p className="p-titulo-p-j">ODS en el que Impacta:</p>
                      {odsArray.map((o) => (
                        <ODScard
                          key={o.id}
                          mostrarProgreso={false}
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
                          cols={"col-6"}
                          style={{ margin: "0 auto" }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="col-12 col-lg-8 col-xxl-9 ods-contain-info">
                    <div>
                      <div className="d-flex flex-column align-items-center justify-content-between p-3 w-100 contain-input-search">
                        <InputText
                          placeholder="Buscar Objetivo del Proyecto"
                          onInput={(e) => {
                            setFiltersObj({
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
                        filters={filtersObj}
                        scrollable
                        rows={5}
                        emptyMessage="Sin resultados"
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        value={objetivosArray}
                      >
                        <Column
                          field={nombreField}
                          header="Objetivo"
                          body={accion}
                          style={{ minWidth: "400px" }}
                          // style={{ minWidth: "250px" }}
                        ></Column>
                        <Column
                          header="ODS"
                          body={buscarOdsPorObjetivo}
                          style={{ minWidth: "250px" }}
                        ></Column>
                        <Column
                          field={progresoTable}
                          header="Progreso"
                          style={{ minWidth: "100px" }}
                        ></Column>
                      </DataTable>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proyectos;
