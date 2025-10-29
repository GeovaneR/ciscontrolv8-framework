import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Control from "./components/control/Control";

function App() {
  const getMode = () => {
    const savedMode = localStorage.getItem("mode");
    return savedMode !== null ? JSON.parse(savedMode) : true;
  };

  const [dark, setMode] = useState(getMode);

  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(dark));
  }, [dark]);

  useEffect(() => {
    document.body.className = dark ? "app" : "light";
  }, [dark]);

  return (
    <Router>
      <div className={dark ? "app" : "light"}>
        <Header dark={dark} setMode={setMode} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/control" element={<Control />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
