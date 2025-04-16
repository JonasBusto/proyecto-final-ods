import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { MODAL_HELP_VALUES } from './HelpProjects';
import '../../styles/modalHelp.css';

export const HelpHome = ({ limit = 6 }) => {
  const [show, setShow] = useState(MODAL_HELP_VALUES.SHOW);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const showModal = JSON.parse(localStorage.getItem('show-modal-home'));

    if (showModal != null) {
      setShow(showModal);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(
      'show-modal-home',
      JSON.stringify(MODAL_HELP_VALUES.CLOSE)
    );

    setShow(MODAL_HELP_VALUES.CLOSE);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (page < limit) {
      setPage(page + 1);
    }
  };

  return (
    <Modal
      backdrop='static'
      show={show}
      onHide={handleClose}
      className='modal-custom-help'
      size='lg'
    >
      <Modal.Header closeButton>
        <div>
          <img
            className='img-fluid tw-h-96 tw-w-[60%] tw-mx-auto tw-my-4'
            src='logo-footer.png'
            alt='image_1'
            draggable={false}
            loading='lazy'
          />
        </div>
      </Modal.Header>
      <Modal.Body className='d-flex flex-column justify-content-center'>
        {page === 1 && (
          <div>
            <div>
              <h4 className='tw-text-2xl tw-uppercase tw-underline tw-font-semibold tw-text-center tw-mt-4 tw-text-md'>
                ¡Bienvenido al Tablero de Control de los ODS!
              </h4>
            </div>
            <div>
              <img
                className='img-fluid tw-h-80 tw-w-[70%] tw-mx-auto tw-my-4'
                src='modals/header-modal.png'
                alt='image_2'
                draggable={false}
                loading='lazy'
              />
            </div>
            <div>
              <p className='tw-text-center tw-text-gray-700'>
                Aquí podrás monitorear y analizar los proyectos que contribuyen
                al cumplimiento de los Objetivos de Desarrollo Sostenible.
                Explora los datos, identifica avances y descubre oportunidades
                para generar un impacto positivo.
              </p>
            </div>
          </div>
        )}
        {page === 2 && (
          <div>
            <h4 className='tw-text-center tw-text-md  tw-px-6 tw-font-semibold tw-uppercase'>
              1. Prueba eligiendo uno de los ods que se muestran en el tablero
            </h4>
            <div className='tw-flex tw-justify-center'>
              <img
                className='tw-object-cover tw-h-80 tw-w-96'
                src='modals/home/help-1.png'
                alt='image_3'
                draggable={false}
                loading='lazy'
              />
            </div>
            <p className='tw-text-center tw-px-6 tw-text-gray-600'>
              Dispones de 17 Objetivos de Desarrollo Sostenible (ODS), cada uno
              enfocado en distintos desafíos globales como la pobreza, la
              educación, la igualdad de género o la acción climática. En este
              tablero puedes visualizarlos todos y seleccionar cualquiera para
              comenzar a explorar su contenido.
            </p>
          </div>
        )}
        {page === 3 && (
          <div>
            <h4 className='tw-text-center tw-px-6 tw-font-semibold tw-uppercase'>
              2. Pasa el cursor sobre uno de los ODS para ver su porcentaje de
              cumplimiento
            </h4>
            <div className='tw-flex tw-justify-center'>
              <img
                className='tw-object-cover tw-h-80 tw-w-96'
                src='modals/home/help-2.gif'
                alt='image_4'
                draggable={false}
                loading='lazy'
              />
            </div>
            <p className='tw-text-center tw-px-6 tw-text-gray-600'>
              Al colocar el cursor sobre cualquiera de los 17 Objetivos de
              Desarrollo Sostenible (ODS) disponibles en el tablero, podrás
              visualizar el porcentaje de avance asociado a cada uno. Esta
              información te permitirá conocer, de forma rápida y visual, el
              progreso alcanzado hasta el momento en cada área clave.
            </p>
          </div>
        )}
        {page === 4 && (
          <div>
            <h4 className='tw-text-center tw-px-6 tw-font-semibold tw-uppercase'>
              3. Haz clic sobre un ODS para ver los proyectos asociados
            </h4>
            <div className='tw-flex tw-justify-center'>
              <img
                className='tw-object-cover tw-h-80 tw-w-[80%]'
                src='modals/home/help-3.gif'
                alt='image_5'
                draggable={false}
                loading='lazy'
              />
            </div>
            <p className='tw-text-center tw-px-6 tw-text-gray-600'>
              Al seleccionar uno de los 17 Objetivos de Desarrollo Sostenible,
              accederás al detalle de los proyectos que contribuyen a su
              cumplimiento. Cada proyecto está vinculado a uno o varios ODS, y
              podrás explorar cómo cada uno impacta en las metas propuestas.
            </p>
          </div>
        )}
        {page === 5 && (
          <div>
            <h4 className='tw-text-center tw-px-6 tw-font-semibold tw-uppercase'>
              4. Presiona el botón "Detalle" para ver información específica del
              proyecto
            </h4>
            <div className='tw-flex tw-justify-center'>
              <img
                className='tw-object-cover tw-h-80 tw-w-[80%]'
                src='modals/home/help-4.gif'
                alt='image_6'
                draggable={false}
                loading='lazy'
              />
            </div>
            <p className='tw-text-center tw-px-6 tw-text-gray-600'>
              En la vista de proyectos asociados a un ODS, cada fila muestra un
              proyecto relacionado. Al hacer clic en el botón{' '}
              <strong>"Detalle"</strong>, accederás a la información completa
              del proyecto, incluyendo su nombre y descripción
            </p>
          </div>
        )}
        {page === 6 && (
          <div>
            <h4 className='tw-text-center tw-px-6 tw-font-semibold tw-uppercase'>
              5. Consulta los objetivos del proyecto desde el botón "Objetivos"
            </h4>
            <div className='tw-flex tw-justify-center'>
              <img
                className='tw-object-cover tw-h-80 tw-w-[80%]'
                src='modals/home/help-5.gif'
                alt='image_7'
                draggable={false}
                loading='lazy'
              />
            </div>
            <p className='tw-text-center tw-px-6 tw-text-gray-600'>
              Cada proyecto cuenta con metas específicas que contribuyen al
              cumplimiento del ODS seleccionado. Al hacer clic en el botón{' '}
              <strong>"Objetivos"</strong>, podrás ver el listado de objetivos
              definidos para ese proyecto, junto con el porcentaje de avance de
              cada uno.
            </p>
          </div>
        )}
      </Modal.Body>
      <div className='tw-flex tw-justify-between tw-px-10 tw-py-3'>
        {page > 1 && (
          <button
            className='tw-bg-[#d2de32] text-white tw-w-32 py-2'
            onClick={prevPage}
          >
            Anterior
          </button>
        )}
        {limit - page > 0 ? (
          <button
            className='tw-bg-[#d2de32] text-white tw-w-32 py-2 ms-auto'
            onClick={nextPage}
          >
            Siguiente
          </button>
        ) : (
          <button
            className='tw-bg-[#ff6c22] text-white tw-w-32 py-2'
            onClick={handleClose}
          >
            Cerrar
          </button>
        )}
      </div>
    </Modal>
  );
};
