import { useState, useEffect, createContext } from 'react';
import ods from '../helpers/ods';

const QosqoContext = createContext();

export function QosqoProvider({ children }) {
  const [odsQosqo, setOdsQosqo] = useState([]);
  const [arrayProyectos, setArrayProyectos] = useState([]);
  const [proyecto, setProyecto] = useState({});
  const [listaProyectos, setListaProyectos] = useState([]);
  const [proyectosDetalle, setProyectosDetalle] = useState([]);
  const [odsSelect, setOdsSelect] = useState(null);
  const [porcentajeODS, setPorcentajeODS] = useState(0);
  const [porcentajesODS, setPorcentajesODS] = useState([]);
  const [cantObjPorODS, setCantObjPorODS] = useState([]);
  const [proyectosPorODS, setProyectosPorODS] = useState([]);

  const buscarProyecto = (id) => {
    let arrayAux = odsQosqo.filter((p) => p.project.id == id);

    return arrayAux;
  };

  const calcularPorcentajesODS = (ods) => {
    let arrayAux = [];

    for (let i = 0; i < odsQosqo.length; i++) {
      for (let m = 0; m < odsQosqo[i].custom_fields?.length; m++) {
        if (odsQosqo[i].custom_fields[m].name == 'ODS') {
          for (let k = 0; k < ods.length; k++) {
            for (
              let j = 0;
              j < odsQosqo[i].custom_fields[m].value.length;
              j++
            ) {
              if (
                odsQosqo[i].custom_fields[m].value[j]
                  .toLowerCase()
                  .includes(ods[k].nombre.toLowerCase())
              ) {
                arrayAux.push({
                  ods_asociado: ods[k].nombre,
                  objetivo: odsQosqo[i],
                });
                break;
              }
            }
          }
        }
      }
    }

    function compare(obj1, obj2) {
      if (obj1.ods_asociado > obj2.ods_asociado) {
        return 1;
      } else if (obj1.ods_asociado < obj2.ods_asociado) {
        return -1;
      } else {
        return 0;
      }
    }

    arrayAux.sort(compare);

    let arrayAuxPorc = [];

    for (let i = 0; i < ods.length; i++) {
      let sumaOds = 0;
      let cont = 0;
      let prom = 0;
      for (let j = 0; j < arrayAux.length; j++) {
        if (
          arrayAux[j].ods_asociado
            .toLowerCase()
            .includes(ods[i].nombre.toLowerCase())
        ) {
          sumaOds += Number(arrayAux[j].objetivo.done_ratio);
          cont++;
        }
      }

      if (cont === 0) {
        prom = 0;
      } else {
        prom = Math.floor(sumaOds / cont);
      }

      arrayAuxPorc.push({
        id: ods[i].id,
        ods_asociado: ods[i].nombre,
        progreso: prom,
      });
    }

    setPorcentajesODS([...arrayAuxPorc]);
  };

  const buscarProObj = (nombre_ods) => {
    let arrayAuxP = [];
    let arrayAuxPD = [];

    for (let i = 0; i < odsQosqo.length; i++) {
      for (let j = 0; j < odsQosqo[i].custom_fields?.length; j++) {
        if (odsQosqo[i].custom_fields[j].name == 'ODS') {
          for (let k = 0; k < odsQosqo[i].custom_fields[j].value.length; k++) {
            if (
              odsQosqo[i].custom_fields[j].value[k]
                .toLowerCase()
                .includes(nombre_ods.toLowerCase())
            ) {
              arrayAuxP.push(odsQosqo[i].project);
              arrayAuxPD.push(odsQosqo[i]);
              break;
            }
          }
        }
      }
    }

    let hash = {};
    arrayAuxP = arrayAuxP.filter((o) =>
      hash[o.id] ? false : (hash[o.id] = true)
    );

    const arrayConHijos = arrayAuxPD.map((obj) => {
      const hijos = odsQosqo.filter((item) => item.parent?.id === obj.id);

      return {
        ...obj,
        children: hijos.length ? hijos : [],
      };
    });

    setListaProyectos([...arrayAuxP]);
    setProyectosDetalle([...arrayConHijos]);
  };

  const calcularOdsPorObjetivo = (ods) => {
    let arrayAux = [];

    for (let k = 0; k < ods.length; k++) {
      let cont = 0;
      let objAsociados = [];
      for (let i = 0; i < odsQosqo.length; i++) {
        for (let m = 0; m < odsQosqo[i].custom_fields?.length; m++) {
          if (odsQosqo[i].custom_fields[m].name == 'ODS') {
            for (
              let j = 0;
              j < odsQosqo[i].custom_fields[m].value.length;
              j++
            ) {
              if (
                odsQosqo[i].custom_fields[m].value[j]
                  .toLowerCase()
                  .includes(ods[k].nombre.toLowerCase())
              ) {
                objAsociados.push(odsQosqo[i].subject);
                cont++;
              }
            }
          }
        }
      }
      arrayAux.push({
        id: ods[k].id,
        ods_asociado: ods[k].nombre,
        cant_objetivos: cont,
        objetivos_asociados: objAsociados,
      });
    }

    setCantObjPorODS([...arrayAux]);
  };

  const calcularProyectosPorODS = () => {
    const resultado = ods.map((o) => ({
      id: o.id,
      ods_asociado: o.nombre,
      proyectos: [],
    }));

    for (let i = 0; i < odsQosqo.length; i++) {
      const item = odsQosqo[i];

      const campoODS = item.custom_fields?.find((cf) => cf.name === 'ODS');
      if (!campoODS) continue;

      for (let j = 0; j < campoODS.value?.length; j++) {
        const etiqueta = campoODS.value[j].toLowerCase();

        for (let k = 0; k < ods.length; k++) {
          if (etiqueta.includes(ods[k].nombre.toLowerCase())) {
            const entry = resultado.find((r) => r.id === ods[k].id);

            if (!entry.proyectos.some((p) => p.id === item.project.id)) {
              entry.proyectos.push(item.project);
            }

            break;
          }
        }
      }
    }

    return resultado;
  };

  useEffect(() => {
    fetch('https://proyecto-final-ods-backend.vercel.app/ods')
      .then((resultado) => resultado.json())
      .then((data) => setOdsQosqo([...data.issues]));
  }, []);

  useEffect(() => {
    calcularPorcentajesODS(ods);
    calcularOdsPorObjetivo(ods);

    setProyectosPorODS(calcularProyectosPorODS());

    let arrayAuxP = [];

    for (let i = 0; i < odsQosqo.length; i++) {
      arrayAuxP.push(odsQosqo[i].project);
    }

    let hash = {};
    arrayAuxP = arrayAuxP.filter((o) =>
      hash[o.id] ? false : (hash[o.id] = true)
    );

    setArrayProyectos([...arrayAuxP]);
    if (odsSelect) {
      buscarProObj(odsSelect.nombre);
    }
  }, [odsQosqo, odsSelect]);

  useEffect(() => {
    let auxSuma = 0;

    for (let i = 0; i < proyectosDetalle.length; i++) {
      auxSuma += Number(proyectosDetalle[i].done_ratio);
    }

    setPorcentajeODS(
      proyectosDetalle.length === 0
        ? 0
        : Math.floor(auxSuma / proyectosDetalle.length)
    );
  }, [proyectosDetalle]);

  return (
    <QosqoContext.Provider
      value={{
        setOdsSelect,
        porcentajeODS,
        buscarProyecto,
        buscarProObj,
        arrayProyectos,
        listaProyectos,
        porcentajesODS,
        proyectosDetalle,
        odsQosqo,
        cantObjPorODS,
        proyectosPorODS,
      }}
    >
      {children}
    </QosqoContext.Provider>
  );
}

export default QosqoContext;
