import { useEffect, useState } from "react";
import { apiRequest } from "../../Api/apiRequest";
import Student from "../../model/Student"
import {StudentDTOArrayToModel} from "../../Mappers/StudentDTOtoModel";
import StudentDTO from "../../DTO/StudentDTO";

export default function useStudent() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchStudent = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await apiRequest<StudentDTO[]>("student");
            setStudents(StudentDTOArrayToModel(data));
        } catch (err) {
            console.error(err);
            setError("Could not load driving schools.");
        } finally {
            setLoading(false);
        }
    };
    const removeStudent = (id: string) => {
        setStudents((prev) => prev.filter((student) => student.id !== id));
    };

    useEffect(() => {
        fetchStudent();
    }, []);

    return {
        students,
        setStudents,
        fetchStudent,
        loading,
        error,
        removeStudent,
    };
}