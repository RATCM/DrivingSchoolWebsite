import { get } from "http";

export interface Appointment {
    id: string;
    date: Date;
    type: string;
    time: string;
    isactive: boolean;
    teacher: string;
    place: string;
}
const appointments: Appointment[] = getAppointments();
export function getAppointments(): Appointment[] {
    return [
        { id: '0', date: new Date(2023, 1, 13), type: 'Banekørsel', time: '08:00', isactive: true , teacher: "Mr. Smith", place: "DTU"},
        { id: '1', date: new Date(2026, 1, 14), type: 'Køretime', time: '08:00', isactive: true , teacher: "Mr. Smith", place: "DTU"},
        { id: '2', date: new Date(2026, 4, 15), type: 'Køretime', time: '08:00', isactive: true , teacher: "Mr. Smith", place: "DTU"},
        { id: '3', date: new Date(2026, 4, 16), type: 'Teoriprøve', time: '10:00', isactive: true , teacher: "Mr. Johnson", place: "DTU"},
        { id: '4', date: new Date(2026, 4, 17), type: 'Glatbane', time: '12:00', isactive: false , teacher: "Mr. Williams", place: "DTU"},
        { id: '5', date: new Date(2026, 4, 18), type: 'Køretime', time: '14:00', isactive: true , teacher: "Mr. Brown", place: "DTU"},
        { id: '6', date: new Date(2026, 4, 19), type: 'Teoriprøve', time: '16:00', isactive: false , teacher: "Mr. Davis", place: "DTU"},
        { id: '7', date: new Date(2026, 1, 15), type: 'Køretime', time: '18:00', isactive: true , teacher: "Mr. Miller", place: "DTU"},
        { id: '8', date: new Date(2026, 1, 16), type: 'Glatbane', time: '20:00', isactive: false , teacher: "Mr. Wilson", place: "DTU"},
        { id: '9', date: new Date(2026, 1, 17), type: 'Teoriprøve', time: '22:00', isactive: true , teacher: "Mr. Moore", place: "DTU"},
        { id: '10', date: new Date(2026, 1, 18), type: 'Køretime', time: '08:00', isactive: true , teacher: "Mr. Taylor", place: "DTU"},
        { id: '11', date: new Date(2026, 1, 19), type: 'Glatbane', time: '10:00', isactive: false , teacher: "Mr. Anderson", place: "DTU"},
        { id: '12', date: new Date(2026, 1, 20), type: 'Teoriprøve', time: '12:00', isactive: true , teacher: "Mr. Thomas", place: "DTU"},
        { id: '13', date: new Date(2026, 1, 21), type: 'Køretime', time: '14:00', isactive: true , teacher: "Mr. Jackson", place: "DTU"},
        { id: '14', date: new Date(2026, 1, 22), type: 'Natkørsel', time: '16:00', isactive: false , teacher: "Mr. White", place: "DTU"},
    ];
}

export default appointments;