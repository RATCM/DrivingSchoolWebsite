import "./MyAppointmentsBox.css";

function MyAppointmentsBox() {
    const appointments = [
        { date: "3 dage", time: "08:00", type: "Køretime", teacher: "Mr. Smith", place: "DTU    " },
        { date: "18-02-26", time: "08:00", type: "Køretime", teacher: "Mr. Smith", place: "DTU" },
        { date: "19-02-26", time: "14:00", type: "Køretime", teacher: "Mr. Smith", place: "DTU" },
        { date: "20-02-26", time: "09:00", type: "Teori", teacher: "Mr. Smith", place: "DTU" },
        { date: "21-02-26", time: "15:00", type: "Glatbane", teacher: "Mr. Smith", place: "DTU" }
    ];
    return (
        <div className="cardBox">
            <h2>Mine aktiviteter</h2>

            {appointments.map((a, i) => (
                <div className="MyAppointments" key={i}>
                    <span>{a.date}</span>
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