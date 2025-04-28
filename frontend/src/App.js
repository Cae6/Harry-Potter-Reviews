import React, { useState, useCallback } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddAnalysis from "./components/addAnalysis";
import HpottersList from "./components/HpottersList";
import Hpotter from "./components/Hpotter";
import Login from "./components/login";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";



function App() {
  const [user, setUser] = useState(null);
  const loginSetter = useCallback(user => {
    setUser(user);
  }
  , [setUser]);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  return (
    <div className="App">
    <Navbar bg="light" expand="lg">
    <Navbar.Brand>Harry Potter Character's Analysis</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link as={NavLink} to={"/Hpotters"}>
        Harry Potter Characters</Nav.Link>
        <Nav.Link as={NavLink} to={user ? "" : "/login"}>
       {user ? "Logout User" : "Login"}
    </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
    <Route path="/" element={<HpottersList />}></Route>
    <Route path="/Hpotters" element={<HpottersList />}></Route>

    <Route path="/Hpotters/:id/" element={<Hpotter user={user} />}></Route>
    <Route
    path="/Hpotters/:id/analysis"
    element={<AddAnalysis user={user} />}
        ></Route>

  <Route path="/login" element={<Login user={user} loginSetter={loginSetter} />}></Route>
      </Routes>



    </div>
  );
}

export default App;
//Chizorom Ekweghariri
//4/28/25
// IT302-452
//cae6@njit.edu
//IT-302 Phase 5