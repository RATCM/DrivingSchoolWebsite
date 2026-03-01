import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Topbar from "./components/Topbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Koreskoler from "./pages/Koreskoler";

function App() {
    return (
        <Router>
            <Topbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/koreskoler" element={<Koreskoler />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;