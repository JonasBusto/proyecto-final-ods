import React from 'react';
import { Link } from 'react-router-dom';
const ODScard = ({
  o,
  color,
  objetivosAsociados,
  porcentajeODS,
  cols,
  style,
  mostrarProgreso,
}) => {
  return (
    <div className={cols + ' d-flex flex-column ods-contain'} style={style}>
      <Link style={{ margin: '0.4rem', marginTop: '1rem' }} to={'/ods/' + o.id}>
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
    </div>
  );
};

export default ODScard;
