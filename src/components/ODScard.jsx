import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const ODScard = ({
  o,
  mostrarProyectos = false,
  color,
  proyectosAsociados = [],
  objetivosAsociados,
  porcentajeODS,
  cols,
  style,
  mostrarProgreso,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={cols + ' d-flex flex-column ods-contain'}
      style={{
        ...style,
      }}
    >
      <Link
        style={{ margin: '0.4rem', marginTop: '1rem', position: 'relative' }}
        to={'/ods/' + o.id}
      >
        {mostrarProyectos && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setVisible(true);
            }}
            className='ods-info-btn'
          >
            <i className='fa-solid fa-circle-exclamation'></i>
          </button>
        )}
        <div className='contain-img-card-ods'>
          {mostrarProgreso && (
            <div>
              <p>{porcentajeODS}%</p>
            </div>
          )}
          <img
            className={
              'img-fluid' + (porcentajeODS == 0 ? ' filtro-sin-porc' : '')
            }
            src={o.imagen}
            alt=''
          />
        </div>
        {mostrarProgreso && (
          <div className='ods-progreso'>
            <div
              style={{
                width: porcentajeODS + '%',
                backgroundColor: color,
              }}
            ></div>
          </div>
        )}
      </Link>
      {mostrarProyectos && visible && (
        <div className='custom-modal-overlay' onClick={() => setVisible(false)}>
          <div className='custom-modal' onClick={(e) => e.stopPropagation()}>
            <div className='custom-modal-header'>
              <h3>
                Proyectos del ODS {o.id}: {o.nombre}
              </h3>
              <button
                className='custom-modal-close'
                onClick={() => setVisible(false)}
              >
                <i className='fa-solid fa-xmark'></i>
              </button>
            </div>

            <div className='custom-modal-body'>
              {proyectosAsociados.length === 0 ? (
                <p>
                  <i
                    className='fa-solid fa-triangle-exclamation'
                    style={{ fontSize: '1.3rem' }}
                  ></i>{' '}
                  Este ODS no está asociado a ningún proyecto.
                </p>
              ) : (
                proyectosAsociados.map((proyecto, index) => (
                  <p key={proyecto.id}>
                    {index + 1}. {proyecto.name}
                  </p>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ODScard;
