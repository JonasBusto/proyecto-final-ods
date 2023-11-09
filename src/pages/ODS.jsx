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

const ODS = () => {
  const { id } = useParams();
  const odsObjeto = ods.filter((o) => o.id == id)[0];
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [expandedRows, setExpandedRows] = useState(null);

  const allowExpansion = (rowData) => {
    return rowData.custom_fields.length > 0;
  };

  const rowExpansionTemplate = (data) => {
    return (
      <div className="p-3 sub-table-custom">
        <h5>Objetivis del {data.nombre}</h5>
        <DataTable value={data.orders} emptyMessage="Sin resultados">
          <Column field="id" header="Id" sortable></Column>
          <Column field="name" header="Objetivo" sortable></Column>
        </DataTable>
      </div>
    );
  };

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
              scrollable
              rows={5}
              emptyMessage="Sin resultados"
              rowsPerPageOptions={[5, 10, 25, 50]}
              value={proyectos}
              expandedRows={expandedRows}
              onRowToggle={(e) => setExpandedRows(e.data)}
              rowExpansionTemplate={rowExpansionTemplate}
            >
              <Column expander={allowExpansion} style={{ width: "5rem" }} />
              <Column
                sortable
                field="id"
                header="ID"
                style={{ minWidth: "100px" }}
              ></Column>
              <Column
                sortable
                field="nombre"
                header="Proyecto"
                style={{ minWidth: "250px" }}
              ></Column>
              <Column
                sortable
                field="desc"
                header="Descripción"
                style={{ minWidth: "400px" }}
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ODS;
