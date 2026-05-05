import useDrivingSchools from "../../Functions/fetchDrivingSchools";
import {apiRequest} from "../../../Api/apiRequest";
import {useEffect, useState} from "react";
import "./InstructorInfoView.css"
import Instructor from "../../../model/Instructor";
import GetSelfFull from "../../Functions/GetSelfFull";
import InstructorDTOtoModel from "../../../Mappers/InstructorDTOtoModel";
import InstructorDTO from "../../../DTO/InstructorDTO";
import InstructorModeltoUpdateDTO from "../../../Mappers/InstructorModeltoUpdateDTO";

function InstructorInfoView() {
    const [localError, setLocalError] = useState("");
    const [localMessage, setLocalMessage] = useState("");
    const { self: Self, error: selfError } = GetSelfFull<InstructorDTO>();

    const {
        drivingSchools: schools,
        loading: schoolsLoading,
        error: schoolsError
    } = useDrivingSchools();

    const [editableInstructor, setEditableInstructor] = useState<Instructor| null>(null);

    const getSchoolName = (schoolId?: string) => {
        if (!schoolId) return "Unknown school";

        return schools.find((school) => school.id === schoolId)?.Name ?? "Unknown school";
    };

    const deleteInstructor = async (id: string) => {
        try {
            setLocalError("");
            setLocalMessage("");

            await apiRequest<void>(`instructor/${id}`, "DELETE");


        } catch (err) {
            console.error(err);
            setLocalError("Kunne ikke slette brugeren.");
        }
    };
    const updateInstructor = async (updatedInstructor: Instructor) => {
        try {
            setLocalError("");
            setLocalMessage("");
            await apiRequest<void>(`instructor/${updatedInstructor.id}`, "PUT", InstructorModeltoUpdateDTO(updatedInstructor));
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
        setEditableInstructor(InstructorDTOtoModel(Self));
    }, [Self, selfError]);

    if ( schoolsLoading || !editableInstructor) {
        return <p>Loading student...</p>;
    }

    return (
        <div className="cardBox">
            <h2>Min Info</h2>

            {localError && <p>{localError}</p>}
            {localMessage && <p>{localMessage}</p>}
            {schoolsError && <p>{schoolsError}</p>}
            <div className="StudentDetails">

                <div className="studentEditForm">
                    <label>
                        Fornavn
                        <input
                            value={editableInstructor.name?.FirstName ?? ""}
                            onChange={(e) =>
                                setEditableInstructor({
                                    ...editableInstructor,
                                    name: {
                                        ...editableInstructor.name,
                                        FirstName: e.target.value
                                    }
                                })
                            }
                        />
                    </label>
                    <label>
                        ID
                        <input
                            value={editableInstructor.id}
                            disabled
                        />
                    </label>

                    <label>
                        Efternavn
                        <input
                            value={editableInstructor.name?.LastName ?? ""}
                            onChange={(e) =>
                                setEditableInstructor({
                                    ...editableInstructor,
                                    name: {
                                        ...editableInstructor.name,
                                        LastName: e.target.value
                                    }
                                })
                            }
                        />
                    </label>

                    <label>
                        Køreskole
                        <input
                            value={getSchoolName(editableInstructor.schoolId)}
                            disabled
                        />
                    </label>

                    <label>
                        Email
                        <input
                            value={editableInstructor.emailAddress ?? ""}
                            onChange={(e) =>
                                setEditableInstructor({
                                    ...editableInstructor,
                                    emailAddress: e.target.value
                                })
                            }
                        />
                    </label>

                    <label>
                        Telefonnummer
                        <input
                            value={editableInstructor.phoneNumber ?? ""}
                            onChange={(e) =>
                                setEditableInstructor({
                                    ...editableInstructor,
                                    phoneNumber: e.target.value
                                })
                            }
                        />
                    </label>
                </div>

                <button
                    className="deleteButton"
                    onClick={() => deleteInstructor(editableInstructor.id)}
                    type="button"
                >
                    Slet Bruger
                </button>
                <button
                    className="updateButton"
                    onClick={() => updateInstructor(editableInstructor)}
                    type="button"
                    >
                    Opdater Bruger
                </button>
            </div>
        </div>
    )
} export default InstructorInfoView;