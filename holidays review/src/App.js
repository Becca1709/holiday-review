import { useState, useEffect } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Demo } from "../pages/Demo";
import { Home } from "../pages/Home";
import { LogIn } from "../pages/LogIn";
import { Form } from "react-bootstrap";
import { Dashboard } from "../pages/Dashboard";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="LogIn" element={<LogIn />} />
        <Route path="Demo" element={<Demo />} />
        <Route path="Dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
