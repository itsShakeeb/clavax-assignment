import React, { useEffect } from "react";
import "./App.css";
import "./components/CSS/index.css";
import Layout from "./components/Layout/Layout";

function App() {
  useEffect(() => {
    const registeredStudent = JSON.parse(localStorage.getItem("students"));
    if (!registeredStudent) {
      const student = [];
      localStorage.setItem("students", JSON.stringify(student));
    }
  }, []);
  return (
    <div className="">
      <Layout />
    </div>
  );
}

export default App;
