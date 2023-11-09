import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

const NavPage = () => {
  return (
    <>
      <Navbar
        style={{ maxWidth: "1300px" }}
        collapseOnSelect
        expand="lg"
        className="mt-2 mx-auto bg-nav-custom"
      >
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img
                className="img-fluid"
                src="https://knauf-industries.es/wp-content/uploads/CABECERA-CIRCULO-ODS-1200x1200.jpg"
                alt=""
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav.Link as={Link} to="/" eventKey="1">
              <i className="fa-solid fa-chalkboard"></i> Tablero de Control
            </Nav.Link>
            <Nav.Link as={Link} to="/" eventKey="2" disabled>
              <i className="fa-regular fa-snowflake"></i> ODS
            </Nav.Link>
            <Nav.Link as={Link} to="/reportes" eventKey="3">
              <i className="fa-solid fa-chart-pie"></i> Reportes
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavPage;