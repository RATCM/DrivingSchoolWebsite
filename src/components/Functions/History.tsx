import appointments from "./Appointments";

export function getHistory() {
    //const appointments = appointments;
    return appointments.filter(a => a.date < new Date());
}

export default getHistory;



