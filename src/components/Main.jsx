import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import ODS from "../pages/ODS";
import Reportes from "../pages/Reportes";
import SobreODS from "../pages/SobreODS";
import Error404 from "../pages/Error404";

const Main = () => {
  return (
    <main className="mt-2 mx-auto" style={{ maxWidth: "1500px" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ods/:id" element={<ODS />} />
        <Route path="reportes" element={<Reportes />} />
        <Route path="sobreODS" element={<SobreODS />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </main>
  );
};

export default Main;
