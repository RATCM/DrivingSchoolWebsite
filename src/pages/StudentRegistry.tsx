import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./StudentRegistry.css";
import { apiRequest } from "../Api/apiRequest";
import StudentRegistryDTO from "../DTO/StudentRegistryDTO";
import NameDTO from "../DTO/NameDTO";

function StudentRegistry() {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const inviteId = searchParams.get("inviteid") ?? "";

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleCreateStudent = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const name: NameDTO = {
                FirstName: firstName,
                LastName: lastName
            };

            const student: StudentRegistryDTO = {
                StudentName: name,
                EmailAddress: email,
                PhoneNumber: phoneNumber,
                Password: password,
                InviteId: inviteId
            };

            await apiRequest<void>("student", "POST", student);

            setShowSuccessPopup(true);
        } catch (err) {
            console.error(err);
            setError("Failed to create student.");
        }
    };

    const closePopup = () => {
        setShowSuccessPopup(false);
        navigate("/login");
    };

    return (
        <div className="create-instructor-page">
            <div className="admin-form-card">
                <h1>Create student</h1>

                <form onSubmit={handleCreateStudent} className="admin-form">
                    <label>
                        First name
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Last name
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Email
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Phone number
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit">Create student</button>
                </form>
            </div>

            {showSuccessPopup && (
                <div className="popupOverlay">
                    <div className="popupBox">
                        <h2>Student Created</h2>

                        <button
                            type="button"
                            onClick={closePopup}
                            className="popupCloseButton"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StudentRegistry;