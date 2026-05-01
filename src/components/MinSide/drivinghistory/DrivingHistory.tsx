import "./DrivingHistory.css";
import getAppointments, { useHistory } from "../../Functions/History";
import { useNavigate } from "react-router-dom";


function DrivingHistory() {
    const navigate = useNavigate();
    const handleClick = (id: string) => {
        navigate("/maps?driving_lesson_token=" + id);
    };
    const { history, loading, error } = useHistory();
    return (
        <div className="cardBox">
            <h2>Mine køretimer</h2>
            <div className="DrivingHistoryHeader">
                <span><b>Dato</b></span>
                <span><b>Start tid</b></span>
                <span><b>Start tid</b></span>
                <span><b>Instruktør Id</b></span>
            </div>

            {history.map((a, i) => (
                <div className="DrivingHistory" key={i}
                onClick={() => handleClick(a.id)}
                style={{ cursor: "pointer" }}
                >
                    <span>{a.route.dateTimeRange.startDateTime.toLocaleDateString('da-DK', {
                        year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                    })}</span>
                    <span>{a.route.dateTimeRange.startDateTime.toLocaleTimeString("da-DK", {
                        hour: "2-digit",
                        minute: "2-digit"
                    })}</span>
                    <span>{a.route.dateTimeRange.endDateTime.toLocaleTimeString("da-DK", {
                        hour: "2-digit",
                        minute: "2-digit"
                    })}</span>
                    <span>{a.instructorId}</span>
                </div>
            ))}

        </div>
    );
}

export default DrivingHistory;