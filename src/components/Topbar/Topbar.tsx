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
                <button onClick={() => navigate("/")}>Køreskoler</button>
                <button onClick={() => navigate("/min_side")}>Min side</button>

            </div>
            <div className={"topbar-right"}>
                <button
                    onClick={() => {
                        localStorage.removeItem("accessToken");
                        localStorage.removeItem("refreshToken");
                        document.cookie = "role=; path=/; max-age=0";
                        navigate("/login");
                    }}
                >
                    Log ind
                </button>
            </div>
        </div>
    );
}

export default Topbar;