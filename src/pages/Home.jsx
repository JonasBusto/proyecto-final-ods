import React, { useState, useEffect, useContext } from 'react';
import QosqoContext from '../context/QosqoContext';
import ods from '../helpers/ods';
import ODScard from '../components/ODScard';
import { HelpHome } from '../components/modals/HelpHome';
import '../styles/home.css';

const Home = () => {
  const { porcentajesODS, cantObjPorODS } = useContext(QosqoContext);

  const colores = [
    'rgba(218, 10, 10, 0.795)',
    'rgba(236, 195, 13, 0.795)',
    'rgba(54, 145, 54, 0.795)',
    'rgba(10, 218, 62, 0.795)',
  ];

  return (
    <div style={{ marginBottom: '3rem' }}>
      <HelpHome />
      <div className='titulo' style={{ marginTop: '4rem' }}>
        <p>Progreso de cumplimiento de los ODS</p>
      </div>
      <div className='row m-0'>
        {ods.map((o) => {
          const progresoReal =
            porcentajesODS.find((p) => p.id == o.id)?.progreso ?? 0;

          const color =
            (progresoReal >= 0 && progresoReal <= 33 && colores[0]) ||
            (progresoReal > 33 && progresoReal <= 66 && colores[1]) ||
            (progresoReal > 66 && progresoReal < 100 && colores[2]) ||
            (progresoReal === 100 && colores[3]) ||
            colores[0];

          return (
            <ODScard
              mostrarProgreso
              key={o.id}
              o={o}
              objetivosAsociados={
                cantObjPorODS.find((p) => p.id == o.id)?.objetivos_asociados
              }
              porcentajeODS={porcentajesODS.find((p) => p.id == o.id)?.progreso}
              cols='col-6 col-md-4 col-lg-2'
              color={color}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
