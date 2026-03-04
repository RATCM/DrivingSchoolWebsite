import React from "react";
import "./Login.css";

function Login() {
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

                <button className="login-button">
                    Log ind
                </button>
            </div>
        </div>
    );
}

export default Login;