import { useEffect, useState } from "react";
import { apiRequest } from "../../Api/apiRequest";
import Instructor from "../../model/Instructor";
import {InstructorDTOArrayToModel} from "../../Mappers/InstructorDTOtoModel";
import InstructorDTO from "../../DTO/InstructorDTO";

export default function useInstructor() {
    const [Instructors, setInstructors] = useState<Instructor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchInstructors = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await apiRequest<InstructorDTO[]>("instructor");
            setInstructors(InstructorDTOArrayToModel(data));
        } catch (err) {
            console.error(err);
            setError("Could not load driving schools.");
        } finally {
            setLoading(false);
        }
    };
    const removeInstructor = (id: string) => {
        setInstructors((prev) => prev.filter((Instructors) => Instructors.id !== id));
    };
    useEffect(() => {
        fetchInstructors();
    }, []);

    return {
        Instructors,
        setInstructors,
        fetchInstructors,
        removeInstructor,
        loading,
        error
    };
}