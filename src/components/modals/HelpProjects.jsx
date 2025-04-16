import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../../styles/modalHelp.css';

export const MODAL_HELP_VALUES = {
  SHOW: true,
  CLOSE: false,
};

export const HelpProjects = ({ limit = 5 }) => {
  useEffect(() => {
    const showModal = JSON.parse(localStorage.getItem('show-modal-projects'));

    if (showModal != null) {
      setShow(showModal);
    }
  }, []);

  const [show, setShow] = useState(MODAL_HELP_VALUES.SHOW);
  const [page, setPage] = useState(1);

  const handleClose = () => {
    localStorage.setItem(
      'show-modal-projects',
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
            alt=''
          />
        </div>
      </Modal.Header>
      <Modal.Body className='d-flex flex-column justify-content-center'>
        {page === 1 && (
          <div>
            <div>
              <h4 className='tw-text-2xl tw-mb-6 tw-uppercase tw-underline tw-font-semibold tw-text-center tw-mt-4 tw-text-md'>
                ¡Bienvenido al Tablero de Control de los ODS!
              </h4>
            </div>
            <div className='tw-flex tw-justify-center'>
              <img
                className='img-fluid tw-h-80 tw-w-[70%] tw-mx-auto tw-my-4'
                src='modals/projects/help-1.png'
                alt='image_1'
                draggable={false}
                loading='lazy'
              />
            </div>
            <div>
              <p className='tw-text-center tw-text-gray-700'>
                En esta sección encontrarás los proyectos involucrados en la
                medición y seguimiento de los Objetivos de Desarrollo Sostenible
                (ODS). Para comenzar, selecciona un proyecto de la lista.
              </p>
            </div>
          </div>
        )}
        {page === 2 && (
          <div>
            <h4 className='tw-text-center tw-text-md tw-px-6 tw-font-semibold tw-uppercase'>
              1. Visualiza los ODS asociados al proyecto
            </h4>
            <div className='tw-flex tw-justify-center'>
              <img
                className='tw-object-cover tw-h-80 tw-w-[90%]'
                src='modals/projects/help-2.gif'
                alt='image_2'
                draggable={false}
                loading='lazy'
              />
            </div>
            <p className='tw-text-center tw-text-gray-600'>
              En el panel izquierdo se muestran los ODS en los que impacta el
              proyecto seleccionado. Esta visualización permite identificar
              rápidamente qué objetivos aborda cada iniciativa.
            </p>
          </div>
        )}
        {page === 3 && (
          <div>
            <h4 className='tw-text-center tw-text-md tw-px-6 tw-font-semibold tw-uppercase'>
              2. Consulta los objetivos específicos del proyecto
            </h4>
            <div className='tw-flex tw-justify-center'>
              <img
                className='tw-object-cover tw-h-80 tw-w-[90%]'
                src='modals/projects/help-3.gif'
                alt='image_3'
                draggable={false}
                loading='lazy'
              />
            </div>
            <p className='tw-text-center tw-text-gray-600'>
              En la parte derecha se encuentran los objetivos definidos para el
              proyecto. Cada uno de estos está vinculado a uno o varios ODS que
              busca impactar positivamente.
            </p>
          </div>
        )}
        {page === 4 && (
          <div>
            <h4 className='tw-text-center tw-text-md tw-px-6 tw-font-semibold tw-uppercase'>
              3. Visualiza los detalles de un objetivo
            </h4>
            <div className='tw-flex tw-justify-center'>
              <img
                className='tw-object-cover tw-h-80 tw-w-[80%]'
                src='modals/projects/help-4.gif'
                alt='image_4'
                draggable={false}
                loading='lazy'
              />
            </div>
            <p className='tw-text-center tw-text-gray-600'>
              Al hacer clic sobre un objetivo, podrás ver información detallada
              sobre el mismo, incluyendo su descripción y estado de avance.
            </p>
          </div>
        )}
        {page === 5 && (
          <div>
            <h4 className='tw-text-center tw-text-md tw-px-6 tw-font-semibold tw-uppercase'>
              4. Analiza el progreso de cada objetivo
            </h4>
            <div className='tw-flex tw-justify-center'>
              <img
                className='tw-object-cover tw-h-80 tw-w-[80%]'
                src='modals/projects/help-5.gif'
                alt='image_5'
                draggable={false}
                loading='lazy'
              />
            </div>
            <p className='tw-text-center tw-text-gray-600'>
              Cada objetivo cuenta con un indicador de porcentaje que refleja el
              nivel de cumplimiento actual. Además, se muestra claramente el ODS
              al que contribuye.
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
