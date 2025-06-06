import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className='mt-auto d-flex flex-column justify-content-center align-items-center'>
      <div className='d-flex justify-content-start'>
        <div style={{ width: '100%', maxWidth: '1300px', margin: '0 auto' }}>
          <img
            className='img-fluid !tw-w-[70vw] !tw-max-w-[40rem]'
            src='https://i.imgur.com/LBTYbdn.png'
            alt='logo_footer'
          />
        </div>
      </div>
      <div className='footer-info'>
        <div style={{ maxWidth: '1400px' }}>
          <div className='row m-0'>
            <div className='col-12 col-md-6 col-lg-5 d-flex flex-column'>
              <div className='info-col-footer'>
                <h5>Resumen</h5>
                <p>
                  Esta pagina, en conjunto con la UTN FRT, brinda la posibilidad
                  de visibilizar información e impacto de los Objetivos de
                  Desarrollo Sostenible (ODS) de los proyectos dentro de la
                  institución.
                </p>
              </div>
              <div className='info-col-footer'>
                <h5>Contacto UNT FRT</h5>
                <div className='d-flex flex-column contacto-footer'>
                  <p>
                    {' '}
                    <i className='fa-solid fa-location-dot'></i> Rivadavia 1050
                    - San Miguel de Tucumán
                  </p>
                  <p>
                    <i className='fa-solid fa-phone'></i> (0381) 4217150 /
                    4307387 / 4307385 - Interno 200
                  </p>
                  <p>
                    <i className='fa-regular fa-clock'></i>
                    Información: Secretaria de Transformación Digital - Lunes a
                    Viernes de 9 a 13 hs y 15 a 21 hs
                  </p>
                </div>
              </div>
            </div>
            <div className='col-12 col-md-6 col-lg-3 d-flex flex-column'>
              <div className='info-col-footer'>
                <h5>Integrantes</h5>
                <div className='d-flex flex-column'>
                  <ul>
                    <li>Antonuccio, Juan Ignacio</li>
                    <li>Busto, Kevin Jonás</li>
                    <li>Paez Lopez, Javier Alfredo</li>
                    <li>Rebolleda, Jose Ignacio</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-12 col-md-6 col-lg-4 d-flex flex-column'>
              <div className='info-col-footer'>
                <h5>Contacto estudiantes</h5>
                <div className='d-flex flex-column contacto-footer-a'>
                  <a href='mailto:Juan.Antonuccio@alu.frt.utn.edu.ar'>
                    Juan.Antonuccio@alu.frt.utn.edu.ar
                  </a>
                  <a href='mailto:Kevin.Busto@alu.frt.utn.edu.ar'>
                    Kevin.Busto@alu.frt.utn.edu.ar
                  </a>
                  <a href='mailto:Javier.PaezLopez@alu.frt.utn.edu.ar'>
                    Javier.PaezLopez@alu.frt.utn.edu.ar
                  </a>
                  <a href='mailto:Jose.Rebolleda@alu.frt.utn.edu.ar'>
                    Jose.Rebolleda@alu.frt.utn.edu.ar
                  </a>
                </div>
              </div>
              <div className='info-col-footer footer-img'>
                <a
                  href='https://www.un.org/sustainabledevelopment/es/objetivos-de-desarrollo-sostenible/'
                  target='_blank'
                >
                  <img
                    className='img-fluid'
                    src='/logo-footer.png'
                    alt='footer_logo_info'
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p>Proyecto Final - UTN FRT - {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
