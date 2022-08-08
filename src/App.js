import React from "react";
import "./App.scss";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import LandScape from "./components/LandScape";
import RegistrForm from "./components/RegistrForm";
import SuccessRegister from "./components/SuccessRegister";
import Users from "./components/Users";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <main className="main">
        <LandScape></LandScape>
        <Users></Users>
        <Routes>
          <Route path="/" element={<RegistrForm />} />
          <Route path="/success" element={<SuccessRegister />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
