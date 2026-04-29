import React, { useEffect, useState } from "react";
import "./CreateNewInstructor.css";
import { API_BASE_URL } from "../../../Api/config";

type DrivingSchool = {
    id: string;
    name: string;
};

function CreateNewInstructor() {
    const [drivingSchools, setDrivingSchools] = useState<DrivingSchool[]>([]);
    const [schoolId, setSchoolId] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const baseuri = API_BASE_URL;

    useEffect(() => {
        const fetchDrivingSchools = async () => {
            try {
                const token = localStorage.getItem("access_token");


                const response = await fetch(baseuri + "drivingschool", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Could not fetch driving schools");
                }

                const data = await response.json();
                setDrivingSchools(data);
            } catch (err) {
                setError("Failed to load driving schools.");
            }
        };

        fetchDrivingSchools();
    }, []);

    const handleCreateInstructor = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const token = localStorage.getItem("access_token");

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

            const response = await fetch(baseuri + "instructor/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error("Could not create instructor");
            }

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
                <h1>Create instructor</h1>

                <form onSubmit={handleCreateInstructor} className="admin-form">
                    <label>
                        Driving school
                        <select
                            value={schoolId}
                            onChange={(e) => setSchoolId(e.target.value)}
                            required
                        >
                            <option value="">Select driving school</option>

                            {drivingSchools.map((school) => (
                                <option key={school.id} value={school.id}>
                                    {school.name}
                                </option>
                            ))}
                        </select>
                    </label>

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

                    {message && <p className="success-message">{message}</p>}
                    {error && <p className="error-message">{error}</p>}

                    <button type="submit">Create instructor</button>
                </form>
            </div>
        </div>
    );
}

export default CreateNewInstructor;