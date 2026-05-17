import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Topbar from "./components/Topbar/Topbar";
import Login from "./pages/Login";
import Koreskoler from "./pages/Koreskoler";
import MinSide from "./pages/MinSide";
import Maps from "./pages/Maps";
import StudentRegistry from "./pages/StudentRegistry";

function getCookie(name: string) {
    const cookies = document.cookie.split("; ");

    const cookie = cookies.find((row) => row.startsWith(name + "="));

    return cookie ? cookie.split("=")[1] : null;
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const role = getCookie("role");
    const accessToken = localStorage.getItem("accessToken");
    if (!role || !accessToken) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

function App() {
    return (
        <Router>
            <Topbar />
            <Routes>
                <Route path="/" element={<Koreskoler />} />
                <Route path="/koreskoler" element={<Koreskoler />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/min_side"
                    element={
                        <ProtectedRoute>
                            <MinSide />
                        </ProtectedRoute>
                    }
                />
                <Route path="/user_invite" element={<StudentRegistry />} />
                <Route path="/maps" element={<Maps />} />
            </Routes>
        </Router>
    );
}

export default App;