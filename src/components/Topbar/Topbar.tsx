import React from "react";
import "./Topbar.css";
import {useNavigate} from "react-router-dom";
import logo from "./logo.svg";

function Topbar() {
    const navigate = useNavigate()

    return (
        <div className="topbar">
            <div className={"topbar-left"}>
                <img src={logo} className="topbar-logo" alt="logo" onClick={() => navigate("/")} />
            </div>


            <div className={"topbar-center"}>
                <button onClick={() => navigate("/")}>Forside</button>
                <button onClick={() => navigate("/Koreskoler")}>Køreskoler</button>
                <button onClick={() => navigate("/Min_side")}>Min side</button>

            </div>
            <div className={"topbar-right"}>
                <button onClick={() => navigate("/login")}>Log ind</button>
            </div>
        </div>
    );
}

export default Topbar;