import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Topbar from "./components/Topbar/Topbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Koreskoler from "./pages/Koreskoler";
import MinSide from "./pages/MinSide";
import Maps from "./pages/Maps";
import DrivingSchoolModel from "./model/DrivingSchoolModel";

const DSM = new DrivingSchoolModel("a","b","c","d","e", 2);

function App() {
    return (
        <Router>
            <Topbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/koreskoler" element={<Koreskoler />} />
                <Route path="/login" element={<Login />} />
                <Route path="/min_side" element={<MinSide/>} />
                <Route path="/user_invite" element={<Login />} />
                <Route path="/maps" element={<Maps />} />
            </Routes>
        </Router>
    );
}

export default App;