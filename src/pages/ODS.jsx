import React, { useEffect, useState, useContext } from 'react';
import QosqoContext from '../context/QosqoContext';
import { useParams } from 'react-router-dom';
import ods from '../helpers/ods';
import '../styles/ods.css';
import proyectos from '../helpers/proyectos';
import objetivos from '../helpers/objetivos';
import ODScard from '../components/ODScard';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { getColorBySemaforo } from '../helpers/peticion';
import { DetailRequestQosqo } from '../components/modals/DetailRequestQosqo';

const letras = 'abcdefghijklmnopqrstuvwxyz'.split('');

const ObjetivoHoverCard = ({ objetivo, hover }) => {
  if (!hover) return null;

  const progreso = objetivo?.done_ratio || 0;

  return (
    <DetailRequestQosqo title='Objetivo' data={objetivo} progress={progreso} />
  );
};

const ObjetivoIndicadores = ({ indicador, index }) => {
  const [hover, setHover] = useState(false);

  const semaforos = indicador?.semaforos || null;
  const progreso = indicador?.done_ratio || 0;
  const color = getColorBySemaforo(progreso, semaforos);

  return (
    <div
      style={{ position: 'relative', marginLeft: '30px', marginBottom: '10px' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <p
        style={{
          color: '#00458e',
          fontWeight: 'bold',
          fontSize: '0.9rem',
          cursor: 'pointer',
          textDecoration: hover ? 'underline' : 'none',
        }}
      >
        {letras[index] + ') ' + (indicador?.subject || 'Indicador desconocido')}
        <span style={{ marginLeft: '10px', fontWeight: 'bold', color }}>
          ({progreso}%)
        </span>
      </p>

      {hover && (
        <DetailRequestQosqo
          title='Indicador'
          data={indicador}
          progress={progreso}
          color={color}
        />
      )}

      <div
        style={{
          width: '100%',
          height: '6px',
          background: '#e5e5e5',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${progreso}%`,
            height: '100%',
            background: color,
            transition: 'width 0.3s ease',
          }}
        />
      </div>
    </div>
  );
};

const ODS = () => {
  const {
    odsQosqo,
    setOdsSelect,
    buscarProObj,
    proyectosDetalle,
    listaProyectos,
    porcentajeODS,
  } = useContext(QosqoContext);

  const { id } = useParams();
  const odsObjeto = ods.filter((o) => o.id == id)[0];
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const colores = ['red', 'yellow', 'green', '#16FF00'];
  const [objetivosArray, setObjetivosArray] = useState([]);

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

    setObjetivosArray([...arrayAux]);

    return objetivosArray;
  };

  const accion = (proyecto_ods) => {
    let arrayAuxFiltrado = [...proyectosDetalle];

    arrayAuxFiltrado = arrayAuxFiltrado.filter(
      (p) => p.project.name == proyecto_ods.name
    );

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show2, setShow2] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [hoverIcon, setHoverIcon] = useState(null);

    return (
      <div>
        <div className='btn-acciones'>
          <button onClick={handleShow}>Detalle</button>
          <button
            onClick={() => {
              handleShow2();
            }}
          >
            Objetivos
          </button>
        </div>
        <Modal className='modal-custom-accion' show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {'Detalle del proyecto ' + proyecto_ods.id}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <b>Nombre del Proyecto: </b>
              {proyecto_ods.name}
            </p>
            <p>
              <b>Descripción del Proyecto: </b>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <div className='btn-acciones'>
              <button onClick={handleClose}>Cerrar</button>
            </div>
          </Modal.Footer>
        </Modal>

        <Modal
          className='modal-custom-accion'
          show={show2}
          onHide={handleClose2}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {'Objetivos del proyecto ' + proyecto_ods.id}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Objetivos: </h5>
            <ul>
              {arrayAuxFiltrado.map((o, index) => (
                <li key={o.id} style={{ marginBottom: '8px' }}>
                  <div>
                    <div style={{ position: 'relative' }}>
                      <p style={{ margin: 0 }}>
                        {index + 1}. {o.subject} <b>({o.done_ratio + '%'})</b>
                        <i
                          onMouseEnter={() => setHoverIcon(o.id)}
                          onMouseLeave={() => setHoverIcon(null)}
                          style={{
                            color: '#4d3e9f',
                            marginLeft: '10px',
                            cursor: 'pointer',
                          }}
                          className='fa-solid fa-circle-question'
                        />
                      </p>

                      <ObjetivoHoverCard
                        objetivo={o}
                        hover={hoverIcon === o.id}
                      />
                    </div>
                    {o.children.length === 0 ? (
                      <p
                        style={{
                          color: 'gray',
                          fontSize: '0.8rem',
                          marginLeft: '2rem',
                        }}
                      >
                        Este objetivo no tiene indicadores.
                      </p>
                    ) : (
                      <div>
                        {o.children.map((indicador, index) => (
                          <ObjetivoIndicadores
                            key={indicador.id}
                            indicador={indicador}
                            index={index}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <div className='btn-acciones'>
              <button onClick={handleClose2}>Cerrar</button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  useEffect(() => {
    setOdsSelect(odsObjeto);
  }, []);

  return (
    <div style={{ marginBottom: '3rem' }}>
      <div className='titulo'>
        <p>{'ODS ' + odsObjeto.id + ': ' + odsObjeto.nombre}</p>
      </div>
      <div className='row m-0'>
        <ODScard
          mostrarProgreso={true}
          color={
            (Number(porcentajeODS) >= 0 &&
              Number(porcentajeODS) <= 33 &&
              colores[0]) ||
            (Number(porcentajeODS) > 33 &&
              Number(porcentajeODS) <= 66 &&
              colores[1]) ||
            (Number(porcentajeODS) > 66 &&
              Number(porcentajeODS) < 100 &&
              colores[2]) ||
            (Number(porcentajeODS) == 100 && colores[3])
          }
          o={odsObjeto}
          porcentajeODS={porcentajeODS}
          cols={'col-10 col-md-4'}
          style={{ margin: '0 auto' }}
        />
        <div className='col-12 col-lg-8 ods-contain-info ods-table-fix'>
          <div>
            <div className='d-flex flex-column align-items-center justify-content-between p-3 w-100 contain-input-search'>
              <InputText
                placeholder='Buscar Proyecto'
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
              className='datatable-custom'
              paginator
              removableSort
              selectionMode='single'
              filters={filters}
              scrollable
              rows={5}
              emptyMessage='Sin resultados'
              rowsPerPageOptions={[5, 10, 25, 50]}
              value={listaProyectos}
            >
              <Column
                field='name'
                header='Proyecto'
                style={{ minWidth: '250px' }}
              ></Column>
              <Column
                header='Detalle'
                body={accion}
                style={{ minWidth: '100px' }}
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ODS;
