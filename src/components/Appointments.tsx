export interface Appointment {
    id: string;
    date: Date;
    type: string;
    time: string;
    isactive: boolean;
    teacher: string;
    place: string;
}

export function getAppointments(): Appointment[] {
    return [
        { id: '0', date: new Date(2026, 1, 14), type: 'Køretime', time: '08:00', isactive: true , teacher: "Mr. Smith", place: "DTU"},
        { id: '1', date: new Date(2026, 4, 15), type: 'Køretime', time: '08:00', isactive: true , teacher: "Mr. Smith", place: "DTU"},
        { id: '2', date: new Date(2026, 4, 16), type: 'Teori', time: '10:00', isactive: true , teacher: "Mr. Johnson", place: "DTU"},
        { id: '3', date: new Date(2026, 4, 17), type: 'Glatbane', time: '12:00', isactive: false , teacher: "Mr. Williams", place: "DTU"},
        { id: '4', date: new Date(2026, 4, 18), type: 'Køretime', time: '14:00', isactive: true , teacher: "Mr. Brown", place: "DTU"},
        { id: '5', date: new Date(2026, 4, 19), type: 'Teori', time: '16:00', isactive: false , teacher: "Mr. Davis", place: "DTU"},
    ];
}

export default getAppointments;