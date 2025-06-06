import React, { useState, useEffect, useContext } from 'react';
import QosqoContext from '../context/QosqoContext';
import { Chart } from 'primereact/chart';
import ods from '../helpers/ods';
import objetivos from '../helpers/objetivos';
import proyectos from '../helpers/proyectos';
import '../styles/reportes.css';

const Reportes = () => {
  const { porcentajesODS, cantObjPorODS, odsQosqo } = useContext(QosqoContext);

  let arrayObjetivos = odsQosqo.filter(
    (o) => o.subject != 0 && o.project.id != 627
  );

  const arrayData = [540, 325, 702, 620];
  const [filtrarPor, setFiltrarPor] = useState('');

  function generarColores(array) {
    const coloresRGB = [];
    for (let i = 0; i < array.length; i++) {
      coloresRGB.push(
        'rgb(' +
          Math.floor(Math.random() * 255) +
          ', ' +
          Math.floor(Math.random() * 255) +
          ', ' +
          Math.floor(Math.random() * 255) +
          ', ' +
          0.8 +
          ')'
      );
    }

    return coloresRGB;
  }

  const data = {
    labels: ods.map((o) => o.nombre),
    datasets: [
      {
        label: 'Porcentaje cumplido de ODS',
        data: ods.map((o) => o.progreso),
        backgroundColor: generarColores(arrayData),
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <div className='titulo'>
        <p>Reportes</p>
      </div>
      <div>
        <div className='row m-0'>
          <div className='col-12 d-flex flex-column align-items-center my-3'>
            <label htmlFor='filtro-por'>Filtrar por: </label>
            <select
              name='filtro-por'
              className='tw-block tw-py-2.5 tw-px-0 tw-w-[30%] tw-text-sm tw-text-gray-500 tw-bg-gray-50 tw-border-0 tw-border-b-2 tw-border-gray-200 tw-appearance-none tw-dark:text-gray-400 tw-dark:border-gray-700 tw-focus:outline-none tw-focus:ring-0 tw-focus:border-gray-200 tw-peer'
              onChange={(e) => setFiltrarPor(e.target.value)}
            >
              <option value=''>Todos</option>
              <option value='ods'>ODS</option>
              <option value='objetivos'>Objetivos</option>
              {/* <option value="proyectos">Proyectos</option> */}
            </select>
          </div>
        </div>
        <div className='row m-0'>
          {(filtrarPor === '' || filtrarPor === 'ods') && (
            <div className='col-12 col-md-6 '>
              <Chart
                type='bar'
                data={{
                  labels: porcentajesODS.map((o) => o.ods_asociado),
                  datasets: [
                    {
                      label: 'Porcentaje cumplido de ODS [%]',
                      data: porcentajesODS.map((o) => o.progreso),
                      backgroundColor: generarColores(porcentajesODS),
                    },
                  ],
                }}
                options={{
                  indexAxis: 'y',
                  aspectRatio: 1.1,
                }}
              />
            </div>
          )}
          {(filtrarPor === '' || filtrarPor === 'objetivos') && (
            <div className='col-12 col-md-6 '>
              <Chart
                type='doughnut'
                data={{
                  labels: arrayObjetivos.map((o) => o.subject),
                  datasets: [
                    {
                      label: 'Porcentaje cumplido del Objetivo [%]',
                      data: arrayObjetivos.map((o) => o.done_ratio),
                      backgroundColor: generarColores(arrayData),
                    },
                  ],
                }}
                options={{
                  indexAxis: 'y',
                  aspectRatio: 1.1,
                }}
              />
            </div>
          )}
          {/* {(filtrarPor === "" || filtrarPor === "proyectos") && (
            <div className="col-12 col-md-6">
              <Chart
                type="pie"
                data={{
                  labels: proyectos.map((o) => o.nombre),
                  datasets: [
                    {
                      label: "Objetivos por Proyectos",
                      data: proyectos.map(
                        (o) => o.custom_fields[0].value.length
                      ),
                      backgroundColor: generarColores(arrayData),
                    },
                  ],
                }}
                options={{
                  indexAxis: "y",
                  aspectRatio: 1.1,
                }}
              />
            </div>
          )} */}
          {(filtrarPor === '' || filtrarPor === 'objetivos') && (
            <div className='col-12 col-md-6'>
              <Chart
                type='polarArea'
                data={{
                  labels: cantObjPorODS.map((o) => o.ods_asociado),
                  datasets: [
                    {
                      label: 'Objetivos por ODS',
                      data: cantObjPorODS.map((o) => o.cant_objetivos),
                      backgroundColor: generarColores(cantObjPorODS),
                    },
                  ],
                }}
                options={{
                  indexAxis: 'y',
                  aspectRatio: 1.1,
                }}
              />
            </div>
          )}
          {(filtrarPor === '' || filtrarPor === 'ods') && (
            <div className='col-12 col-md-6 '>
              <Chart
                type='line'
                data={{
                  labels: porcentajesODS.map((o) => o.ods_asociado),
                  datasets: [
                    {
                      label: 'Porcentaje cumplido de ODS',
                      data: porcentajesODS.map((o) => o.progreso),
                      backgroundColor: generarColores(porcentajesODS),
                    },
                  ],
                }}
                options={{
                  indexAxis: 'y',
                  aspectRatio: 1.1,
                }}
              />
            </div>
          )}
          {(filtrarPor === '' || filtrarPor === 'ods') && (
            <div className='col-12 col-md-6 '>
              <Chart
                type='radar'
                data={{
                  labels: porcentajesODS.map((o) => o.ods_asociado),
                  datasets: [
                    {
                      label: 'Porcentaje cumplido de ODS',
                      data: porcentajesODS.map((o) => o.progreso),
                      backgroundColor: generarColores(porcentajesODS),
                    },
                  ],
                }}
                options={{
                  indexAxis: 'y',
                  aspectRatio: 1.1,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reportes;
