import React, { useState, useEffect, useContext } from "react";
import "../styles/proyectos.css";
import QosqoContext from "../context/QosqoContext";
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
  const { buscarProyecto, arrayProyectos } = useContext(QosqoContext);

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
    let arrayObjAux = buscarProyecto(proyecto.id);
    buscarObjetivosYods(arrayObjAux);
  };

  const colores = ["red", "yellow", "green", "#16FF00"];

  const buscarObjetivosYods = (proyecto) => {
    setProyectoSeleccionado({ ...proyecto[0].project });
    setObjetivosArray([...proyecto]);

    return objetivosArray;
  };

  const nombreProyecto = (proyecto) => {
    if (proyecto.id !== 627) {
      return (
        <span onClick={() => mostrarInfoProyecto(proyecto)}>
          {proyecto.name}
        </span>
      );
    }
  };

  const progresoObjetivo = (objetivo) => {
    return <span>{objetivo.done_ratio + "%"}</span>;
  };

  const nombreProyectoField = (proyecto) => {
    return proyecto.name;
  };

  const accion = (objetivo) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <div>
        <span className="color-obj-modal" onClick={handleShow}>
          {objetivo.subject} <i className="fa-solid fa-share"></i>
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
              <b>Objetivo:</b> {objetivo.subject}
            </p>
            <p>
              <b>Progreso actual:</b> {objetivo.done_ratio + "%"}
            </p>
            <p>
              <b>ODS asociados:</b>{" "}
            </p>
            <ul>
              {objetivo.custom_fields.map(
                (o) =>
                  o.name == "ODS" &&
                  o.value.map((v) => <li key={Math.random() * 100}>{v}</li>)
              )}
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

    for (let i = 0; i < objetivo.custom_fields.length; i++) {
      if (objetivo.custom_fields[i].name == "ODS") {
        for (let k = 0; k < objetivo.custom_fields[i].value.length; k++) {
          for (let j = 0; j < ods.length; j++) {
            if (
              objetivo.custom_fields[i].value[k]
                .toLowerCase()
                .includes(ods[j].nombre.toLowerCase())
            ) {
              auxArray.push(ods[j]);
            }
          }
        }
      }
    }

    let hash = {};
    auxArray = auxArray.filter((o) =>
      hash[o.id] ? false : (hash[o.id] = true)
    );

    function compare(obj1, obj2) {
      if (obj1.id > obj2.id) {
        return 1;
      } else if (obj1.id < obj2.id) {
        return -1;
      } else {
        return 0;
      }
    }

    auxArray.sort(compare);

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
    return objetivo.subject;
  };

  const progresoTable = (objetivo) => {
    return <span>{objetivo.realizado + "%"}</span>;
  };

  useEffect(() => {
    let arrayAux = [];

    let arrayAuxObj = [...objetivosArray];

    for (let i = 0; i < arrayAuxObj.length; i++) {
      for (let m = 0; m < arrayAuxObj[i].custom_fields.length; m++) {
        if (arrayAuxObj[i].custom_fields[m].name == "ODS") {
          for (
            let j = 0;
            j < arrayAuxObj[i].custom_fields[m].value.length;
            j++
          ) {
            for (let k = 0; k < ods.length; k++) {
              if (
                arrayAuxObj[i].custom_fields[m].value[j]
                  .toLowerCase()
                  .includes(ods[k].nombre.toLowerCase())
              ) {
                arrayAux.push(ods[k]);
                break;
              }
            }
          }
        }
      }
    }

    let hash = {};
    arrayAux = arrayAux.filter((o) =>
      hash[o.id] ? false : (hash[o.id] = true)
    );

    function compare(obj1, obj2) {
      if (obj1.id > obj2.id) {
        return 1;
      } else if (obj1.id < obj2.id) {
        return -1;
      } else {
        return 0;
      }
    }

    arrayAux.sort(compare);

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
              value={arrayProyectos}
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
                  ? proyectoSeleccionado.name
                  : "Sin proyecto seleccionado"}
              </p>
            </div>
            {objetivosArray.length !== 0 && (
              <div>
                <div className="row m-0">
                  <div className="col-12 col-lg-4 col-xxl-3 p-0">
                    <div className="row m-0">
                      <p className="p-titulo-p-j">ODS en los que Impacta:</p>
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
                          // field={progresoTable}
                          header="Progreso"
                          body={progresoObjetivo}
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
