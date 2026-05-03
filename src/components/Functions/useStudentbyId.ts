// src/components/Functions/useStudentById.ts

import { useState } from "react";
import { apiRequest } from "../../Api/apiRequest";
import StudentDTO from "../../DTO/StudentDTO";
import StudentDTOtoModel from "../../Mappers/StudentDTOtoModel";
import Student from "../../model/Student";

export default function useStudentById() {
    const [student, setStudent] = useState<Student | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchStudentById = async (id: string) => {
        setLoading(true);
        setError("");

        try {
            const data = await apiRequest<StudentDTO>(`student/${id}`);
            setStudent(StudentDTOtoModel(data));
        } catch (err) {
            console.error(err);
            setError("Could not load student details.");
        } finally {
            setLoading(false);
        }
    };

    const clearStudent = () => {
        setStudent(null);
        setError("");
    };

    return {
        student,
        setStudent,
        loading,
        error,
        fetchStudentById,
        clearStudent
    };
}