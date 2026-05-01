import { useEffect, useState } from "react";
import { apiRequest } from "../../Api/apiRequest";
import DrivingLessonDTO from "../../DTO/DrivingLessonDTO";
import DrivingLessonModel from "../../model/DrivingLessonModel";
import GetSelf from "./GetSelf";
import { mapDrivingLessonDTOsToModels } from "../../Mappers/DrivingLessonMapper";

export function useHistory() {
    const { id: myId, error: selfError } = GetSelf();

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
                const data = await apiRequest<DrivingLessonDTO[]>(
                    `student/${myId}/drivingLesson`
                );

                const mappedLessons = mapDrivingLessonDTOsToModels(data);

                setDrivingLessons(mappedLessons);
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
        lesson => lesson.route.dateTimeRange.endDateTime < new Date()
    );

    return {
        history,
        loading,
        error
    };
}

export default useHistory;