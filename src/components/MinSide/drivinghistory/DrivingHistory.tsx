import "./DrivingHistory.css";
import { useHistory } from "../../Functions/History";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import GetTheoryLessons from "../../Functions/GetTheoryLessons";

function DrivingHistory() {
    const navigate = useNavigate();

    const [activeView, setActiveView] = useState<"driving" | "theory">("driving");

    const handleClick = (id: string) => {
        navigate("/maps?driving_lesson_token=" + id);
    };

    const { history, loading, error } = useHistory();

    const {
        theory_history,
        theory_loading,
        theory_error
    } = GetTheoryLessons();

    return (
        <div className="cardBox">

            <div className="DrivingHistoryButtons">
                <button
                    className={activeView === "driving" ? "activeHistoryButton" : ""}
                    onClick={() => setActiveView("driving")}
                >
                    Køretimer
                </button>

                <button
                    className={activeView === "theory" ? "activeHistoryButton" : ""}
                    onClick={() => setActiveView("theory")}
                >
                    Teori-timer
                </button>
            </div>

            {activeView === "driving" && (
                <>
                    <h2>Mine køretimer</h2>

                    <div className="DrivingHistoryHeader">
                        <span><b>Dato</b></span>
                        <span><b>Start tid</b></span>
                        <span><b>Slut tid</b></span>
                        <span><b>Instruktør Id</b></span>
                    </div>

                    {loading && <p>Indlæser køretimer...</p>}
                    {error && <p>{error}</p>}

                    {history.map((a, i) => (
                        <div
                            className="DrivingHistory"
                            key={i}
                            onClick={() => handleClick(a.id)}
                            style={{ cursor: "pointer" }}
                        >
                            <span>
                                {a.route.dateTimeRange.startDateTime.toLocaleDateString("da-DK", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric"
                                })}
                            </span>

                            <span>
                                {a.route.dateTimeRange.startDateTime.toLocaleTimeString("da-DK", {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })}
                            </span>

                            <span>
                                {a.route.dateTimeRange.endDateTime.toLocaleTimeString("da-DK", {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })}
                            </span>

                            <span>{a.instructorId}</span>
                        </div>
                    ))}
                </>
            )}

            {activeView === "theory" && (
                <>
                    <h2>Mine teori-timer</h2>

                    <div className="DrivingHistoryHeader">
                        <span><b>Dato</b></span>
                        <span><b>Start tid</b></span>
                        <span><b>Pris</b></span>
                        <span><b>Instruktør Id</b></span>
                    </div>

                    {theory_loading && <p>Indlæser teori-timer...</p>}
                    {theory_error && <p>{theory_error}</p>}

                    {theory_history.map((a, i) => (
                        <div
                            className="DrivingHistory"
                            key={i}
                            style={{ cursor: "default" }}
                        >
                            <span>
                                {a.lessonDateTime.toLocaleDateString("da-DK", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric"
                                })}
                            </span>

                            <span>
                                {a.lessonDateTime.toLocaleTimeString("da-DK", {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })}
                            </span>

                            <span>{a.price.Amount + " " + a.price.Currency}</span>

                            <span>{a.instructorId}</span>
                        </div>
                    ))}
                </>
            )}

        </div>
    );
}

export default DrivingHistory;