import { useEffect, useState } from "react";
import { apiRequest } from "../../Api/apiRequest";
import TheoryLessonDTO from "../../DTO/TheoryLessonDTO";
import GetSelf from "./GetSelf";
import TheoryLessonModel from "../../model/TheoryLessonModel";
import {mapTheoryLessonDTOsToModels} from "../../Mappers/TheoryLessonDTOtoModel"
type Role = "student" | "instructor" | "admin";

function getCookie(name: string): string | null {
    const value = document.cookie
        .split("; ")
        .find((row) => row.startsWith(name + "="));

    return value ? decodeURIComponent(value.split("=")[1]) : null;
}

export function useHistory() {
    const { id: myId, error: selfError } = GetSelf();
    const role = (getCookie("role") ?? "student") as Role;
    const [theoryLessons, setTheoryLessons] = useState<TheoryLessonModel[]>([]);
    const [theory_loading, setLoading] = useState(false);
    const [theory_error, setError] = useState("");

    useEffect(() => {
        if (selfError) {
            setError(selfError);
            return;
        }

        if (!myId) return;

        const getTheoryLessons = async () => {
            setLoading(true);
            setError("");

            try {
                if (role === "student") {
                    const data = await apiRequest<TheoryLessonDTO[]>(
                        `student/${myId}/theorylesson`
                    );
                    const mappedLessons = mapTheoryLessonDTOsToModels(data);
                    mappedLessons.sort((a, b) => a.lessonDateTime.getTime() - b.lessonDateTime.getTime());
                    setTheoryLessons(mappedLessons);
                }
                else if (role === "instructor") {
                    const data = await apiRequest<TheoryLessonDTO[]>(
                        `instructor/${myId}/theorylesson`
                    );
                    const mappedLessons = mapTheoryLessonDTOsToModels(data);
                    mappedLessons.sort((a, b) => a.lessonDateTime.getTime() - b.lessonDateTime.getTime());
                    setTheoryLessons(mappedLessons);
                } else setError("Could not load driving lesson history.");

            } catch (err) {
                console.error(err);
                setError("Could not load driving lesson history.");
            } finally {
                setLoading(false);
            }
        };

        getTheoryLessons();
    }, [myId, selfError]);

    const theory_history = theoryLessons.filter(
        lesson => lesson.lessonDateTime < new Date()
    );

    return {
        theory_history,
        theory_loading,
        theory_error
    };
}

export default useHistory;