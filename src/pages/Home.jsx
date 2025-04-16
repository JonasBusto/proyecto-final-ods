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
        {ods.map((o) => (
          <ODScard
            mostrarProgreso={true}
            key={o.id}
            o={o}
            objetivosAsociados={
              cantObjPorODS.filter((p) => p.id == o.id)[0]?.objetivos_asociados
            }
            porcentajeODS={
              porcentajesODS.filter((p) => p.id == o.id)[0]?.progreso
            }
            cols={'col-6 col-md-4 col-lg-2'}
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
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
