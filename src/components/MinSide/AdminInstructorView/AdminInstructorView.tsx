import "./AdminInstructorView.css";
import { useEffect, useState } from "react";
import { apiRequest } from "../../../Api/apiRequest";
import useDrivingSchools from "../../Functions/fetchDrivingSchools";
import useInstructors from "../../Functions/useInstructor";
import useInstructorById from "../../Functions/useInstructorbyId";

function AdminInstructorView() {
    const [localError, setLocalError] = useState("");
    const [localMessage, setLocalMessage] = useState("");

    const {
        drivingSchools: schools,
        loading: schoolsLoading,
        error: schoolsError
    } = useDrivingSchools();

    const {
        Instructors,
        loading: instructorsLoading,
        error: instructorsError,
        removeInstructor,
    } = useInstructors();

    const {
        instructor: selectedInstructor,
        loading: detailsLoading,
        error: instructorDetailsError,
        fetchInstructorById,
        clearInstructor
    } = useInstructorById();

    const [displayInstructor, setDisplayInstructor] = useState<typeof selectedInstructor>(null);

    useEffect(() => {
        if (selectedInstructor) {
            setDisplayInstructor(selectedInstructor);
        } else {
            setDisplayInstructor(null);
        }
    }, [selectedInstructor]);

    const getSchoolName = (schoolId?: string) => {
        if (!schoolId) return "Unknown school";

        return schools.find((school) => school.id === schoolId)?.Name ?? "Unknown school";
    };

    const deleteInstructor = async (id: string) => {
        try {
            setLocalError("");
            setLocalMessage("");

            await apiRequest<void>(`instructor/${id}`, "DELETE");

            clearInstructor();
            removeInstructor(id);
        } catch (err) {
            console.error(err);
            setLocalError("Could not delete instructor.");
        }
    };

    if (instructorsLoading || schoolsLoading) {
        return <p>Loading instructors...</p>;
    }

    return (
        <div className="cardBox">
            <h2>Instruktører</h2>

            {localError && <p>{localError}</p>}
            {localMessage && <p>{localMessage}</p>}
            {schoolsError && <p>{schoolsError}</p>}
            {instructorsError && <p>{instructorsError}</p>}
            {instructorDetailsError && <p>{instructorDetailsError}</p>}

            {!selectedInstructor && (
                <>
                    <div className="InstructorHeader">
                        <span>ID</span>
                        <span>Email</span>
                        <span>Køreskole</span>
                        <span>Telefon nummer</span>
                    </div>

                    {Instructors.map((instructor) => (
                        <button
                            className="InstructorRow instructorRowButton"
                            key={instructor.id}
                            onClick={() => {
                                setLocalError("");
                                setLocalMessage("");
                                fetchInstructorById(instructor.id);
                            }}
                            type="button"
                        >
                            <span>{instructor.id}</span>
                            <span>{instructor.emailAddress}</span>
                            <span>{getSchoolName(instructor.schoolId)}</span>
                            <span>{instructor.phoneNumber}</span>
                        </button>
                    ))}
                </>
            )}

            {detailsLoading && <p>Loading instructor details...</p>}

            {selectedInstructor && displayInstructor && !detailsLoading && (
                <div className="InstructorDetails">
                    <button
                        className="backButton"
                        onClick={() => {
                            setLocalError("");
                            setLocalMessage("");
                            clearInstructor();
                        }}
                        type="button"
                    >
                        Tilbage til oversigt
                    </button>

                    <div className="instructorEditForm">
                        <label>
                            Fornavn
                            <input
                                value={displayInstructor.name?.FirstName ?? ""}
                                disabled
                            />
                        </label>

                        <label>
                            ID
                            <input
                                value={displayInstructor.id}
                                disabled
                            />
                        </label>

                        <label>
                            Efternavn
                            <input
                                value={displayInstructor.name?.LastName ?? ""}
                                disabled
                            />
                        </label>

                        <label>
                            Køreskole
                            <input
                                value={getSchoolName(displayInstructor.schoolId)}
                                disabled
                            />
                        </label>

                        <label>
                            Email
                            <input
                                value={displayInstructor.emailAddress ?? ""}
                                disabled
                            />
                        </label>

                        <label>
                            Telefonnummer
                            <input
                                value={displayInstructor.phoneNumber ?? ""}
                                disabled
                            />
                        </label>
                    </div>

                    <button
                        className="deleteButton"
                        onClick={() => deleteInstructor(displayInstructor.id)}
                        type="button"
                    >
                        Slet instruktør
                    </button>
                </div>
            )}
        </div>
    );
}

export default AdminInstructorView;