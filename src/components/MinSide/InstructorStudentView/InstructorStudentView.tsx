import "./InstructorStudentView.css";
import { useEffect, useState } from "react";
import GetSelf from "../../Functions/GetSelf";
import {apiRequest} from "../../../Api/apiRequest";

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

type Instructor = {
    id: string;
    schoolId: string;
    instructorName?: {
        firstName?: string;
        lastName?: string;
    };
    emailAddress?: string;
    phoneNumber?: string;
    [key: string]: unknown;
}
function InstructorStudentView() {
    const [students, setStudents] = useState<Student[]>([]);
    const [myDrivingSchool, setMyDrivingSchool] = useState<string>("");
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [loading, setLoading] = useState(true);
    const [detailsLoading, setDetailsLoading] = useState(false);
    const [error, setError] = useState("");
    const { id: myId, error: selfError } = GetSelf();
    const fetchDrivingSchool = async () => {
       try {
            const data = await apiRequest<Instructor>(`instructor/${myId}`);
            setMyDrivingSchool(data.schoolId);
        }
        catch (err) {
            console.error(err);
            setError("Could not load drivingschool.");
        }
    }
    const fetchStudents = async () => {
        try {

            const data = await apiRequest<Student[]>(`drivingschool/${myDrivingSchool}/student`);

            setStudents(data);
        } catch (err) {
            console.error(err);
            setError("Could not load students."+ myId);
        } finally {
            setLoading(false);
        }
    };

    const fetchStudentById = async (id: string) => {
        setDetailsLoading(true);
        setError("");
        try {
            const data = await apiRequest<Student>(`student/${id}`);
            setSelectedStudent(data);
        } catch (err) {
            console.error(err);
            setError("Could not load student details.");
        } finally {
            setDetailsLoading(false);
        }
    };

    useEffect(() => {
        if (selfError) {
            setError(selfError);
            setLoading(false);
            return;
        }

        if (!myId) {
            return;

        }
        fetchDrivingSchool();
        if (!myDrivingSchool) {
            return;
        }
        fetchStudents();
    }, [myDrivingSchool, myId, selfError]);

    if (loading) {
        return <p>Loading students...</p>;
    }

    return (
        <div className="cardBox">
            <h2>Studerende</h2>

            {error && <p>{error}</p>}

            {!selectedStudent && (
                <>
                    <div className="studentHeader">
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
                            <span>{student.id.replaceAll("-", "-\u200B")}</span>
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
                        <strong>{selectedStudent.studentName?.firstName}{" "}
                        {selectedStudent.studentName?.lastName}</strong>
                    </h3>

                    <p><strong>ID:</strong> {selectedStudent.id}</p>
                    <p><strong>School ID:</strong> {selectedStudent.schoolId}</p>
                    <p><strong>Email:</strong> {selectedStudent.emailAddress}</p>
                    <p><strong>Phone:</strong> {selectedStudent.phoneNumber}</p>

                </div>
            )}
        </div>
    );
}

export default InstructorStudentView;