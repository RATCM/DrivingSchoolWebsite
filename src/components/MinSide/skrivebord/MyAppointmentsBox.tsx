import "./MyAppointmentsBox.css";
import getAppointments, {useAppointments} from "../../Functions/Appointments";
import appointments from "../../Functions/Appointments";
import {useNavigate} from "react-router-dom";

type props = {
    Date: Date;
}
function handleClick(id: string) {
    alert(`Du klikkede på aftale med id: ${id}`);
}
export function MyAppointmentsBox() {



    const { history, loading, error } = useAppointments();
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

export function MyFilteredAppointmentsBox({ Date }: props) {
    const { history, loading, error } = useAppointments();
    const todaysAppointments = history.filter(
        (a) =>
            a.route.dateTimeRange.startDateTime.getDate() === Date.getDate() &&
            a.route.dateTimeRange.startDateTime.getMonth() === Date.getMonth() &&
            a.route.dateTimeRange.startDateTime.getFullYear() === Date.getFullYear()
    );
    return (
        <div className="cardBox">
            <h2><b>Mine aktiviteter</b></h2>
            <div className="MyAppointmentsHeader">
                <span><b>Dato</b></span>
                <span><b>Tid</b></span>
                <span><b>Type</b></span>
                <span><b>Instruktør</b></span>
                <span><b>Placering</b></span>
            </div>
            {todaysAppointments.map((a, i) => (
                <div className="MyAppointments" key={i}
                onClick={() => handleClick(a.id)}
                style={{ cursor: "pointer" }} // optional: makes it feel clickable
            >
                    <span>{a.route.dateTimeRange.startDateTime.toLocaleDateString('da-DK', {
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

export default MyAppointmentsBox;