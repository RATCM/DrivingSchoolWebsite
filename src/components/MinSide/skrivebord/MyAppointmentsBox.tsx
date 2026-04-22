import "./MyAppointmentsBox.css";
import getAppointments from "../../Functions/Appointments";
import appointments from "../../Functions/Appointments";

type props = {
    Date: Date;
}
function handleClick(id: string) {
    alert(`Du klikkede på aftale med id: ${id}`);
}
export function MyAppointmentsBox() {
    
    const comingAppointments = appointments.filter(a => a.date >= new Date());
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
            {comingAppointments.map((a, i) => (
                <div className="MyAppointments" key={i}>
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

export function MyFilteredAppointmentsBox({ Date }: props) {
    const todaysAppointments = appointments.filter(
        (a) =>
            a.date.getDate() === Date.getDate() &&
            a.date.getMonth() === Date.getMonth() &&
            a.date.getFullYear() === Date.getFullYear()
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

export default MyAppointmentsBox;