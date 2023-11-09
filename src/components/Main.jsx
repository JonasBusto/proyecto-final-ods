import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import ODS from "../pages/ODS";
import Error404 from "../pages/Error404";
import Reportes from "../pages/Reportes";

const Main = () => {
  return (
    <main className="mt-2 mx-auto" style={{ maxWidth: "1300px" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ods/:id" element={<ODS />} />
        <Route path="reportes" element={<Reportes />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </main>
  );
};

export default Main;
