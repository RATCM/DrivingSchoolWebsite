import { useEffect, useState } from "react";
import { apiRequest } from "../../Api/apiRequest";
import DrivingLessonDTO from "../../DTO/DrivingLessonDTO";
import DrivingLessonModel from "../../model/DrivingLessonModel";
import GetSelf from "./GetSelf";
import { mapDrivingLessonDTOsToModels } from "../../Mappers/DrivingLessonMapper";

type Role = "student" | "instructor" | "admin";

function getCookie(name: string): string | null {
    const value = document.cookie
        .split("; ")
        .find((row) => row.startsWith(name + "="));

    return value ? decodeURIComponent(value.split("=")[1]) : null;
}



export function useAppointments() {
    const { id: myId, error: selfError } = GetSelf();
    const role = (getCookie("role") ?? "student") as Role;
    const [drivingLessons, setDrivingLessons] = useState<DrivingLessonModel[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (selfError) {
            setError(selfError);
            return;
        }

        if (!myId) return;

        const getDrivingLessons = async () => {
            setLoading(true);
            setError("");

            try {
                if (role === "student") {
                    const data = await apiRequest<DrivingLessonDTO[]>(
                        `student/${myId}/drivingLesson`
                    );
                    const mappedLessons = mapDrivingLessonDTOsToModels(data);
                    setDrivingLessons(mappedLessons);
                } else if (role === "instructor") {
                    const data = await apiRequest<DrivingLessonDTO[]>(
                        `instructor/${myId}/drivingLesson`
                    );
                    const mappedLessons = mapDrivingLessonDTOsToModels(data);
                    setDrivingLessons(mappedLessons);
                } else setError(
                    "Could not load driving lesson history."
                )
            } catch (err) {
                console.error(err);
                setError("Could not load driving lesson history.");
            } finally {
                setLoading(false);
            }
        };

        getDrivingLessons();
    }, [myId, selfError]);

    const history = drivingLessons.filter(
        lesson => lesson.route.dateTimeRange.startDateTime > new Date()
    );

    return {
        history,
        loading,
        error
    };
}

export default useAppointments;