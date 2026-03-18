import "./DrivingHistory.css";
import getAppointments from "../../Appointments";

function DrivingHistory() {
    const appointments = getAppointments();
    const History = appointments.filter(a => a.date < new Date());
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