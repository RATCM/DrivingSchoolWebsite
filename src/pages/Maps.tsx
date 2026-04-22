import React from "react";
import "./Maps.css";
import { useSearchParams } from "react-router-dom";

function Maps() {
    const [searchParams] = useSearchParams();
    const DrivingLessonId = searchParams.get("driving_lesson_token");

    return (
        <div className="maps-page">
            <div className="maps-content">    
                <p className="invite-text">
                {DrivingLessonId
                    ? `Driving Lesson ID: ${DrivingLessonId}`
                    : "No ID provided"}
                </p>
            </div>
        </div>
    );
}

export default Maps;