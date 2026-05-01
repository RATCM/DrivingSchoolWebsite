import "./AdminInstructorView.css";
import { useEffect, useState } from "react";
import {apiRequest} from "../../../Api/apiRequest";

type Instructor = {
    id: string;
    schoolId?: string;
    name?: {
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

    const fetchInstructors = async () => {
        try {

            const data = await apiRequest<Instructor[]>("instructor");
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


            const data = await apiRequest<Instructor>(`instructor/${id}`);
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
            const data: School[] = await apiRequest<School[]>('drivingschool');

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
            await apiRequest<void>(`instructor/${id}`, "DELETE")

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
                        <span>Køreskole</span>
                        <span>Telefon nummer</span>
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
                        {selectedInstructor.name?.firstName}{" "}
                        {selectedInstructor.name?.lastName}
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