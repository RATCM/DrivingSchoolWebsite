import React, { useState } from "react";
import "./Login.css";
import { useNavigate, useSearchParams } from "react-router-dom";


function Login() {
    //const axios = require('axios/sist/browser/axios.cjs');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const inviteToken = searchParams.get("invite_token");
    
    /*Add call to Login method on backend to log in*/
    const handleLogin = async () => {
        
    try {
        //const uri = "http://localhost:5259/admin/login";
        const uri = "http://localhost:5259/auth/login/" + role;
        
        const response = await fetch(uri, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });


        if (!response.ok) {
            throw new Error("Login failed");
        }

        const data = await response.json();

        // store JWT or session
        localStorage.setItem("access_token", data.accessToken);
        localStorage.setItem("refresh_token", data.refreshToken);
        document.cookie = `role=${role}; path=/; max-age=86400`;
        
        navigate("/min_side");
    } catch (error) {
        console.error(error);
        navigate("/koreskoler");
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <select
                    className="login-input"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                </select>
                <button className="login-button" onClick={handleLogin}>
                    Log ind
                </button>
            </div>
        </div>
    );
}

export default Login;