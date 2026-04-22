import React from "react";
import "./Login.css";
import { useNavigate, useSearchParams } from "react-router-dom";

function Login() {
    //const axios = require('axios/sist/browser/axios.cjs');
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const inviteToken = searchParams.get("invite_token");
    
    const request = new Request("http://localhost:5259/DrivingSchool", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Name: "Test School",
            Address: "Test Address",
            PhoneNumber: "12345678",
            WebAddress: "https://test.com"
        })

    });
    /*Add call to Login method on backend to log in*/
    const handleLogin = async () => {
        try {
            
            const response = await fetch(request);

            if (!response.ok) {
                throw new Error("Failed to create driving school");
            }

            const data = await response.json();
            console.log("Created:", data);

            // Navigate after success
            navigate("/min_side");
        } catch (error) {
            console.error(error);
            navigate("/koreskoler"); // Navigate even on error for testing purposes
        }
    };
    return (
        <div className="login-page">

            {inviteToken && (
                <p className="invite-text">
                    Invitation ID: {inviteToken}
                </p>
            )}

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