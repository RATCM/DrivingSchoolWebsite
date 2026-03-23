import getAppointments from "./Appointments";

export function getHistory() {
    const appointments = getAppointments();
    return appointments.filter(a => a.date < new Date());
}

export default getHistory;



