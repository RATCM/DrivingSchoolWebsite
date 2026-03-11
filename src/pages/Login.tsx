import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    /*Add call to Login method on backend to log in*/
    const handleLogin = () => {
        navigate("/Min_side");
    };
    return (
        <div className="login-page">
            <div className="login-box">
                <h2>Log ind</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="login-input"
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="login-input"
                />

                <button className="login-button" onClick={handleLogin}>
                    Log ind
                </button>
            </div>
        </div>
    );
}

export default Login;