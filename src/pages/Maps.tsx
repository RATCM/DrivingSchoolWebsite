import { useSearchParams } from "react-router-dom";
import DrivingLessonRouteMap from "../components/Functions/DrivingLessonRouteMap";
import useHistory from "../components/Functions/History";

function DrivingLessonPage() {
    const { history, loading, error } = useHistory();
    const [searchParams] = useSearchParams();

    const drivingLessonId = searchParams.get("driving_lesson_token");

    const drivingLesson = history.find(
        (lesson) => lesson.id === drivingLessonId
    );

    if (loading) {
        return <p>Loading route...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!drivingLessonId) {
        return <p>No driving lesson id was provided.</p>;
    }

    if (!drivingLesson) {
        return <p>Could not find driving lesson with id: {drivingLessonId}</p>;
    }

    return (
        <div>
            <h1>Driving lesson route</h1>

            <DrivingLessonRouteMap drivingLesson={drivingLesson} />
        </div>
    );
}

export default DrivingLessonPage;