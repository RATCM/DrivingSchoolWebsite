import React, { useEffect, useState } from "react";
import "./CreateNewInstructor.css";
import {apiRequest} from "../../../Api/apiRequest";
import useDrivingSchools from "../../Functions/fetchDrivingSchools";

function CreateNewInstructor() {
    const [schoolId, setSchoolId] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const {
        drivingSchools: schools,
        loading: schoolsLoading,
        error: schoolsError
    } = useDrivingSchools();

    const handleCreateInstructor = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const body = {
                schoolId: schoolId,
                name: {
                    firstName: firstName,
                    lastName: lastName
                },
                email: email,
                phoneNumber: phoneNumber,
                password: password
            };
            await apiRequest<void>('instructor/register', 'POST', body);

            setMessage("Instructor created successfully.");

            setSchoolId("");
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhoneNumber("");
            setPassword("");
        } catch (err) {
            setError("Failed to create instructor.");
        }
    };

    return (
        <div className="create-instructor-page">
            <div className="admin-form-card">
                <h1>Registrer ny instruktør</h1>

                <form onSubmit={handleCreateInstructor} className="admin-form">
                    <label>
                        Køreskole
                        <select
                            value={schoolId}
                            onChange={(e) => setSchoolId(e.target.value)}
                            required
                        >
                            <option value="">Select driving school</option>

                            {schools.map((school) => (
                                <option key={school.id} value={school.id}>
                                    {school.Name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Fornavn
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Efternavn
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
                        Telefonnummer
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Kodeord
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>

                    {message && <p className="success-message">{message}</p>}
                    {error && <p className="error-message">{error}</p>}

                    <button type="submit">Registrer instruktør</button>
                </form>
            </div>
        </div>
    );
}

export default CreateNewInstructor;