import "./AdminStudentview.css";
import { useEffect, useState } from "react";
import { apiRequest } from "../../../Api/apiRequest";
import useDrivingSchools from "../../Functions/fetchDrivingSchools";
import useStudents from "../../Functions/useStudents";
import useStudentById from "../../Functions/useStudentbyId";

function AdminStudentView() {
    const [localError, setLocalError] = useState("");
    const [localMessage, setLocalMessage] = useState("");

    const {
        drivingSchools: schools,
        loading: schoolsLoading,
        error: schoolsError
    } = useDrivingSchools();

    const {
        students,
        loading: studentsLoading,
        error: studentsError,
        removeStudent,
        fetchStudent
    } = useStudents();

    const {
        student: selectedStudent,
        loading: detailsLoading,
        error: studentDetailsError,
        fetchStudentById,
        clearStudent
    } = useStudentById();

    const [editableStudent, setEditableStudent] = useState<typeof selectedStudent>(null);

    useEffect(() => {
        if (selectedStudent) {
            setEditableStudent(selectedStudent);
        } else {
            setEditableStudent(null);
        }
    }, [selectedStudent]);

    const getSchoolName = (schoolId?: string) => {
        if (!schoolId) return "Unknown school";

        return schools.find((school) => school.id === schoolId)?.Name ?? "Unknown school";
    };

    const deleteStudent = async (id: string) => {
        try {
            setLocalError("");
            setLocalMessage("");

            await apiRequest<void>(`student/${id}`, "DELETE");

            clearStudent();
            removeStudent(id);
        } catch (err) {
            console.error(err);
            setLocalError("Could not delete student.");
        }
    };

    if (studentsLoading || schoolsLoading) {
        return <p>Loading students...</p>;
    }

    return (
        <div className="cardBox">
            <h2>Studerende</h2>

            {localError && <p>{localError}</p>}
            {localMessage && <p>{localMessage}</p>}
            {schoolsError && <p>{schoolsError}</p>}
            {studentsError && <p>{studentsError}</p>}
            {studentDetailsError && <p>{studentDetailsError}</p>}

            {!selectedStudent && (
                <>
                    <div className="StudentHeader">
                        <span>ID</span>
                        <span>Email</span>
                        <span>Køreskole</span>
                        <span>Telefon nummer</span>
                    </div>

                    {students.map((student) => (
                        <button
                            className="StudentRow studentRowButton"
                            key={student.id}
                            onClick={() => {
                                setLocalError("");
                                setLocalMessage("");
                                fetchStudentById(student.id);
                            }}
                            type="button"
                        >
                            <span>{student.id}</span>
                            <span>{student.emailAddress}</span>
                            <span>{getSchoolName(student.schoolId)}</span>
                            <span>{student.phoneNumber}</span>
                        </button>
                    ))}
                </>
            )}

            {detailsLoading && <p>Loading student details...</p>}

            {selectedStudent && editableStudent && !detailsLoading && (
                <div className="StudentDetails">
                    <button
                        className="backButton"
                        onClick={() => {
                            setLocalError("");
                            setLocalMessage("");
                            clearStudent();
                        }}
                        type="button"
                    >
                        Tilbage til oversigt
                    </button>

                    <div className="studentEditForm">
                        <label>
                            Fornavn
                            <input
                                value={editableStudent.name?.FirstName ?? ""}
                                disabled
                            />
                        </label>
                        <label>
                            ID
                            <input
                                value={editableStudent.id}
                                disabled
                            />
                        </label>

                        <label>
                            Efternavn
                            <input
                                value={editableStudent.name?.LastName ?? ""}
                                disabled
                            />
                        </label>

                        <label>
                            Køreskole
                            <input
                                value={getSchoolName(editableStudent.schoolId)}
                                disabled
                            />
                        </label>

                        <label>
                            Email
                            <input
                                value={editableStudent.emailAddress ?? ""}
                                disabled
                            />
                        </label>

                        <label>
                            Telefonnummer
                            <input
                                value={editableStudent.phoneNumber ?? ""}
                                disabled
                            />
                        </label>
                    </div>

                    <button
                        className="deleteButton"
                        onClick={() => deleteStudent(editableStudent.id)}
                        type="button"
                    >
                        Slet studerende
                    </button>

                </div>
            )}
        </div>
    );
}

export default AdminStudentView;