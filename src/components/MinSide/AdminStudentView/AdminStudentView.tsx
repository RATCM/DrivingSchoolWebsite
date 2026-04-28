import "./AdminStudentview.css";
import { useEffect, useState } from "react";

type Student = {
    id?: string;
    schoolId?: string;
    emailAddress?: string;
    phoneNumber?: string;
};

function AdminStudentView() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStudents = async () => {
            const accessToken = localStorage.getItem("access_token");

            if (!accessToken) {
                setError("No access token found. Please log in again.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("http://localhost:5259/student", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch students. Status: ${response.status}`);
                }

                const data = await response.json();

                setStudents(data);
            } catch (err) {
                console.error(err);
                setError("Could not load students.");
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    if (loading) {
        return (
            <div className="cardBox">
                <h2>Studerende</h2>
                <p>Loading students...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="cardBox">
                <h2>Studerende</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="cardBox">
            <h2>Studerende</h2>
            <div className="StudentHeader">
                <span>ID</span>
                <span>Email</span>
                <span>SkoleId</span>
                <span>Telefon nummer</span>
            </div>
            {students.length === 0 ? (
                <p>No students found.</p>
            ) : (
                students.map((student, i) => (
                    <div className="DrivingHistory" key={student.id ?? i}>
                        <span>{student.id ?? "No ID"}</span>
                        <span>{student.emailAddress ?? "No name"}</span>
                        <span>{student.schoolId ?? "No email"}</span>
                        <span>{student.phoneNumber ?? ""}</span>
                    </div>
                ))
            )}
        </div>
    );
}

export default AdminStudentView;