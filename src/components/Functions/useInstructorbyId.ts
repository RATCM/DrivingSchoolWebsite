import { useState } from "react";
import { apiRequest } from "../../Api/apiRequest";
import InstructorDTO from "../../DTO/InstructorDTO";
import InstructorDTOtoModel from "../../Mappers/InstructorDTOtoModel";
import Instructor from "../../model/Instructor";

export default function useInstructorById() {
    const [instructor, setInstructor] = useState<Instructor | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchInstructorById = async (id: string) => {
        setLoading(true);
        setError("");

        try {
            const data = await apiRequest<InstructorDTO>(`instructor/${id}`);
            setInstructor(InstructorDTOtoModel(data));
        } catch (err) {
            console.error(err);
            setError("Could not load instructor details.");
        } finally {
            setLoading(false);
        }
    };

    const clearInstructor = () => {
        setInstructor(null);
        setError("");
    };

    return {
        instructor,
        setInstructor,
        loading,
        error,
        fetchInstructorById,
        clearInstructor
    };
}