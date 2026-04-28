import "./AdminInstructorView.css";
import { useEffect, useState } from "react";

type Instructor = {
    id: string;
    schoolId?: string;
    instructorName?: {
        firstName?: string;
        lastName?: string;
    };
    emailAddress?: string;
    phoneNumber?: string;
    [key: string]: unknown;
};
type School = {
    id: string;
    name: string;
};



function AdminInstructorView() {
    const [instructors, setInstructors] = useState<Instructor[]>([]);
    const [schools, setSchools] = useState<Record<string, string>>({});
    const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
    const [loading, setLoading] = useState(true);
    const [detailsLoading, setDetailsLoading] = useState(false);
    const [error, setError] = useState("");

    const accessToken = localStorage.getItem("access_token");

    const authHeaders = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
    };

    const fetchInstructors = async () => {
        if (!accessToken) {
            setError("No access token found. Please log in again.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:5259/instructor", {
                method: "GET",
                headers: authHeaders,
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

    const fetchInstructorById = async (id: string) => {
        setDetailsLoading(true);
        setError("");

        try {
            const response = await fetch(`http://localhost:5259/instructor/${id}`, {
                method: "GET",
                headers: authHeaders,
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch instructor. Status: ${response.status}`);
            }

            const data = await response.json();
            setSelectedInstructor(data);
        } catch (err) {
            console.error(err);
            setError("Could not load instructor details.");
        } finally {
            setDetailsLoading(false);
        }
    };
    const fetchSchools = async () => {
        try {
            const response = await fetch("http://localhost:5259/drivingschool", {
                method: "GET",
                headers: authHeaders,
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch schools. Status: ${response.status}`);
            }

            const data: School[] = await response.json();

            const schoolMap: Record<string, string> = {};
            data.forEach((school) => {
                schoolMap[school.id] = school.name;
            });

            setSchools(schoolMap);
        } catch (err) {
            console.error(err);
            setError("Could not load schools.");
        }
    };
    const deleteInstructor = async (id: string) => {
        try {
            const response = await fetch(
                `http://localhost:5259/instructor/${id}`,
                {
                    method: "DELETE",
                    headers: authHeaders,
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to delete instructor. Status: ${response.status}`);
            }

            setSelectedInstructor(null);
            setInstructors((prev) => prev.filter((instructor) => instructor.id !== id));
        } catch (err) {
            console.error(err);
            setError("Could not delete instructor.");
        }
    };

    useEffect(() => {
        fetchInstructors();
        fetchSchools();
    }, []);

    if (loading) {
        return <p>Loading instructors...</p>;
    }

    return (
        <div className="cardBox">
            <h2>Instruktører</h2>

            {error && <p>{error}</p>}

            {!selectedInstructor && (
                <>
                    <div className="InstructorHeader">
                        <span>ID</span>
                        <span>Email</span>
                        <span>SchoolId</span>
                        <span>Phone</span>
                    </div>

                    {instructors.map((instructor) => (
                        <button
                            className="InstructorRow instructorRowButton"
                            key={instructor.id}
                            onClick={() => fetchInstructorById(instructor.id)}
                            type="button"
                        >
                            <span>{instructor.id}</span>
                            <span>{instructor.emailAddress}</span>
                            <span>{schools[instructor.schoolId ?? ""] ?? "Unknown school"}</span>

                            <span>{instructor.phoneNumber}</span>
                        </button>
                    ))}
                </>
            )}

            {detailsLoading && <p>Loading instructor details...</p>}

            {selectedInstructor && !detailsLoading && (
                <div className="InstructorDetails">
                    <button
                        className="backButton"
                        onClick={() => setSelectedInstructor(null)}
                        type="button"
                    >
                        Back to instructors
                    </button>

                    <h3>
                        {selectedInstructor.instructorName?.firstName}{" "}
                        {selectedInstructor.instructorName?.lastName}
                    </h3>

                    <p><strong>ID:</strong> {selectedInstructor.id}</p>
                    <p><strong>School ID:</strong> {selectedInstructor.schoolId}</p>
                    <p><strong>Email:</strong> {selectedInstructor.emailAddress}</p>
                    <p><strong>Phone:</strong> {selectedInstructor.phoneNumber}</p>

                    <pre>{JSON.stringify(selectedInstructor, null, 2)}</pre>

                    <button
                        className="deleteButton"
                        onClick={() => deleteInstructor(selectedInstructor.id)}
                        type="button"
                    >
                        Delete instructor
                    </button>
                </div>
            )}
        </div>
    );
}

export default AdminInstructorView;