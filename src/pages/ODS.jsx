import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ods from "../helpers/ods";
import "../styles/ods.css";
import proyectos from "../helpers/proyectos";
import objetivos from "../helpers/objetivos";
import ODScard from "../components/ODScard";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

const ODS = () => {
  const { id } = useParams();
  const odsObjeto = ods.filter((o) => o.id == id)[0];
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const colores = ["red", "yellow", "green", "#16FF00"];

  const accion = (proyecto_ods) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show2, setShow2] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    return (
      <div>
        <div className="btn-acciones">
          <button onClick={handleShow}>Detalle</button>
          <button onClick={handleShow2}>Objetivos</button>
        </div>
        <Modal className="modal-custom-accion" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {"Detalle del proyecto " + proyecto_ods.id}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur
            obcaecati laudantium, rerum perspiciatis inventore laboriosam
            ducimus quae eos adipisci ut, quis nemo nihil doloremque magnam,
            optio sunt officiis odit possimus?
          </Modal.Body>
          <Modal.Footer>
            <div className="btn-acciones">
              <button onClick={handleClose}>Cerrar</button>
            </div>
          </Modal.Footer>
        </Modal>

        <Modal
          className="modal-custom-accion"
          show={show2}
          onHide={handleClose2}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {"Objetivos del proyecto " + proyecto_ods.id}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur
            obcaecati laudantium, rerum perspiciatis inventore laboriosam
            ducimus quae eos adipisci ut, quis nemo nihil doloremque magnam,
            optio sunt officiis odit possimus?
          </Modal.Body>
          <Modal.Footer>
            <div className="btn-acciones">
              <button onClick={handleClose2}>Cerrar</button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  return (
    <div style={{ marginBottom: "3rem" }}>
      <div className="titulo">
        <p>{"ODS " + odsObjeto.id + ": " + odsObjeto.nombre}</p>
      </div>
      <div className="row m-0">
        <ODScard
          color={
            (Number(odsObjeto.progreso) >= 0 &&
              Number(odsObjeto.progreso) <= 33 &&
              colores[0]) ||
            (Number(odsObjeto.progreso) >= 34 &&
              Number(odsObjeto.progreso) <= 66 &&
              colores[1]) ||
            (Number(odsObjeto.progreso) >= 66 &&
              Number(odsObjeto.progreso) <= 99 &&
              colores[2]) ||
            (Number(odsObjeto.progreso) == 100 && colores[3])
          }
          o={odsObjeto}
          cols={"col-10 col-md-4"}
          style={{ margin: "0 auto" }}
        />
        <div className="col-12 col-lg-8 ods-contain-info">
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
              <Column
                header="Detalle"
                body={accion}
                style={{ minWidth: "100px" }}
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ODS;
