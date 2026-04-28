import "./AdminStudentview.css";
import { useEffect, useState } from "react";

type Student = {
    id: string;
    schoolId?: string;
    studentName?: {
        firstName?: string;
        lastName?: string;
    };
    emailAddress?: string;
    phoneNumber?: string;
    theoryLessons?: unknown;
    drivingLessons?: unknown;
};

function AdminStudentView() {
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [loading, setLoading] = useState(true);
    const [detailsLoading, setDetailsLoading] = useState(false);
    const [error, setError] = useState("");

    const accessToken = localStorage.getItem("access_token");

    const authHeaders = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
    };

    const fetchStudents = async () => {
        if (!accessToken) {
            setError("No access token found. Please log in again.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:5259/student", {
                method: "GET",
                headers: authHeaders,
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

    const fetchStudentById = async (id: string) => {
        setDetailsLoading(true);
        setError("");

        try {
            const response = await fetch(`http://localhost:5259/student/${id}`, {
                method: "GET",
                headers: authHeaders,
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch student. Status: ${response.status}`);
            }

            const data = await response.json();
            setSelectedStudent(data);
        } catch (err) {
            console.error(err);
            setError("Could not load student details.");
        } finally {
            setDetailsLoading(false);
        }
    };

    const deleteStudent = async (id: string) => {
        try {
            const response = await fetch(
                `http://localhost:5259/student/${id}`,
                {
                    method: "DELETE",
                    headers: authHeaders,
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to delete student. Status: ${response.status}`);
            }

            setSelectedStudent(null);
            setStudents((prev) => prev.filter((student) => student.id !== id));
        } catch (err) {
            console.error(err);
            setError("Could not delete student.");
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    if (loading) {
        return <p>Loading students...</p>;
    }

    return (
        <div className="cardBox">
            <h2>Studerende</h2>

            {error && <p>{error}</p>}

            {!selectedStudent && (
                <>
                    <div className="StudentHeader">
                        <span>ID</span>
                        <span>Name</span>
                        <span>Email</span>
                        <span>Phone</span>
                    </div>

                    {students.map((student) => (
                        <button
                            className="DrivingHistory studentRowButton"
                            key={student.id}
                            onClick={() => fetchStudentById(student.id)}
                            type="button"
                        >
                            <span>{student.id}</span>
                            <span>
                                {student.studentName?.firstName} {student.studentName?.lastName}
                            </span>
                            <span>{student.emailAddress}</span>
                            <span>{student.phoneNumber}</span>
                        </button>
                    ))}
                </>
            )}

            {detailsLoading && <p>Loading student details...</p>}

            {selectedStudent && !detailsLoading && (
                <div className="StudentDetails">
                    <button
                        className="backButton"
                        onClick={() => setSelectedStudent(null)}
                        type="button"
                    >
                        Back to students
                    </button>

                    <h3>
                        {selectedStudent.studentName?.firstName}{" "}
                        {selectedStudent.studentName?.lastName}
                    </h3>

                    <p><strong>ID:</strong> {selectedStudent.id}</p>
                    <p><strong>School ID:</strong> {selectedStudent.schoolId}</p>
                    <p><strong>Email:</strong> {selectedStudent.emailAddress}</p>
                    <p><strong>Phone:</strong> {selectedStudent.phoneNumber}</p>

                    <pre>
                        {JSON.stringify(selectedStudent, null, 2)}
                    </pre>

                    <button
                        className="deleteButton"
                        onClick={() => deleteStudent(selectedStudent.id)}
                        type="button"
                    >
                        Delete student
                    </button>
                </div>
            )}
        </div>
    );
}

export default AdminStudentView;