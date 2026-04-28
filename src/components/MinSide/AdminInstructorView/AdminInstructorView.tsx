import "./AdminInstructorView.css";
import { useEffect, useState } from "react";

type Instructor = {
    id?: string;
    schoolId?: string;
    emailAddress?: string;
    phoneNumber?: string;
};

function AdminStudentView() {
    const [instructors, setInstructors] = useState<Instructor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchInstructors = async () => {
            const accessToken = localStorage.getItem("access_token");

            if (!accessToken) {
                setError("No access token found. Please log in again.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("http://localhost:5259/instructor", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch instructors. Status: ${response.status}`);
                }

                const data = await response.json();

                setInstructors(data);
            } catch (err) {
                console.error(err);
                setError("Could not load instructors.");
            } finally {
                setLoading(false);
            }
        };

        fetchInstructors();
    }, []);

    if (loading) {
        return (
            <div className="cardBox">
                <h2>Instruktører</h2>
                <p>Loading instruktører...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="cardBox">
                <h2>Instruktører</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="cardBox">
            <h2>Instruktører</h2>
            <div className="InstructorHeader">
                <span>ID</span>
                <span>Email</span>
                <span>SkoleId</span>
                <span>Telefon nummer</span>
            </div>
            {instructors.length === 0 ? (
                <p>No students found.</p>
            ) : (
                instructors.map((instructor, i) => (
                    <div className="DrivingHistory" key={instructor.id ?? i}>
                        <span>{instructor.id ?? "No ID"}</span>
                        <span>{instructor.emailAddress ?? "No name"}</span>
                        <span>{instructor.schoolId ?? "No email"}</span>
                        <span>{instructor.phoneNumber ?? ""}</span>
                    </div>
                ))
            )}
        </div>
    );
}

export default AdminStudentView;