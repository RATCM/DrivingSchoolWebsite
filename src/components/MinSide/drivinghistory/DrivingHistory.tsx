import "./DrivingHistory.css";
import getAppointments, { getHistory } from "../../Functions/History";
import { useNavigate } from "react-router-dom";


function DrivingHistory() {
    const navigate = useNavigate();
    const handleClick = (id: string) => {
        navigate("/maps?driving_lesson_token=" + id);
    };
    const History = getHistory();
    return (
        <div className="cardBox">
            <h2>Mine køretimer</h2>

            {History.map((a, i) => (
                <div className="DrivingHistory" key={i}
                onClick={() => handleClick(a.id)}
                style={{ cursor: "pointer" }}
                >
                    <span>{a.date.toLocaleDateString('da-DK', {
                    month: 'long',
                    day: 'numeric'
                    })}</span>
                    <span>{a.time}</span>
                    <span>{a.type}</span>
                    <span>{a.teacher}</span>
                    <span>{a.place}</span>
                </div>
            ))}

        </div>
    );
}

export default DrivingHistory;