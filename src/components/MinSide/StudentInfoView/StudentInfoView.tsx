import useDrivingSchools from "../../Functions/fetchDrivingSchools";
import {apiRequest} from "../../../Api/apiRequest";
import {useEffect, useState} from "react";
import "./StudentInfoView.css"
import Student from "../../../model/Student";
import GetSelfFull from "../../Functions/GetSelfFull";
import StudentDTOtoModel from "../../../Mappers/StudentDTOtoModel";
import StudentDTO from "../../../DTO/StudentDTO";
import StudentModeltoUpdateDTO from "../../../Mappers/StudentModeltoUpdateDTO";

function StudentInfoView() {
    const [localError, setLocalError] = useState("");
    const [localMessage, setLocalMessage] = useState("");
    const { self: Self, error: selfError } = GetSelfFull<StudentDTO>();

    const {
        drivingSchools: schools,
        loading: schoolsLoading,
        error: schoolsError
    } = useDrivingSchools();

    const [editableStudent, setEditableStudent] = useState<Student| null>(null);

    const getSchoolName = (schoolId?: string) => {
        if (!schoolId) return "Unknown school";

        return schools.find((school) => school.id === schoolId)?.Name ?? "Unknown school";
    };

    const deleteStudent = async (id: string) => {
        try {
            setLocalError("");
            setLocalMessage("");

            await apiRequest<void>(`student/${id}`, "DELETE");


        } catch (err) {
            console.error(err);
            setLocalError("Kunne ikke slette brugeren.");
        }
    };
    const updateStudent = async (updatedStudent: Student) => {
        try {
            setLocalError("");
            setLocalMessage("");

            await apiRequest<void>(`student/${updatedStudent.id}`, "PUT", StudentModeltoUpdateDTO(updatedStudent));
        } catch (err) {
            console.error(err);
            setLocalError("Kunne ikke opdatere brugeren.");
        }
    }
    useEffect(() => {
        if (selfError) {
            setLocalError(selfError);
            return;
        }

        if (!Self) return;
        setEditableStudent(StudentDTOtoModel(Self));
    }, [Self, selfError]);

    if ( schoolsLoading || !editableStudent) {
        return <p>Loading student...</p>;
    }
    return (
        <div className="cardBox">
            <h2>Studerende</h2>

            {localError && <p>{localError}</p>}
            {localMessage && <p>{localMessage}</p>}
            {schoolsError && <p>{schoolsError}</p>}
            <div className="StudentDetails">

                <div className="studentEditForm">
                    <label>
                        Fornavn
                        <input
                            value={editableStudent.name?.FirstName ?? ""}
                            onChange={(e) =>
                                setEditableStudent({
                                    ...editableStudent,
                                    name: {
                                        ...editableStudent.name,
                                        FirstName: e.target.value
                                    }
                                })
                            }
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
                            onChange={(e) =>
                                setEditableStudent({
                                    ...editableStudent,
                                    name: {
                                        ...editableStudent.name,
                                        LastName: e.target.value
                                    }
                                })
                            }
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
                            onChange={(e) =>
                                setEditableStudent({
                                    ...editableStudent,
                                    phoneNumber: e.target.value
                                })
                            }
                        />
                    </label>

                    <label>
                        Telefonnummer
                        <input
                            value={editableStudent.phoneNumber ?? ""}
                            onChange={(e) =>
                                setEditableStudent({
                                    ...editableStudent,
                                    phoneNumber: e.target.value
                                })
                            }
                        />
                    </label>
                </div>

                <button
                    className="deleteButton"
                    onClick={() => deleteStudent(editableStudent.id)}
                    type="button"
                >
                    Slet bruger
                </button>
                <button
                    className="updateButton"
                    onClick={() => updateStudent(editableStudent)}
                    type="button"
                    >
                    Opdater bruger
                </button>

            </div>
        </div>
    )
} export default StudentInfoView;