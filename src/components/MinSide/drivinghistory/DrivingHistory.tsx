import "./DrivingHistory.css";
import getAppointments, { getHistory } from "../../Functions/History";

function DrivingHistory() {
    const History = getHistory();
    return (
        <div className="cardBox">
            <h2>Mine køretimer</h2>

            {History.map((a, i) => (
                <div className="DrivingHistory" key={i}>
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