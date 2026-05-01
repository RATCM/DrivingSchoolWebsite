import React, { useState } from 'react';
import './Kalender.css';
import appointments, {useAppointments} from "../../Functions/Appointments";

type KalenderProps = {
    selectedDate: Date | null;
    onSelectDate: (date: Date) => void;
};

const Kalender: React.FC<KalenderProps> = ({ selectedDate, onSelectDate }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const { history, loading, error } = useAppointments();
    //const appointments = appointments;
    const orderedAppointments = history.sort((a, b) => a.route.dateTimeRange.startDateTime.getTime()-(b.route.dateTimeRange.startDateTime.getTime()));

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        return day === 0 ? 6 : day - 1; // Monday first
    };

    const handlePreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleDayClick = (day: number) => {
        const clickedDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
        );
        onSelectDate(clickedDate);
    };

    const hasActiveAppointment = (day: number) => {
    return orderedAppointments.some(
        (apt) =>
            apt.route.dateTimeRange.startDateTime >= new Date() &&
            apt.route.dateTimeRange.startDateTime.getDate() === day &&
            apt.route.dateTimeRange.startDateTime.getDate() === currentDate.getMonth() &&
            apt.route.dateTimeRange.startDateTime.getDate() === currentDate.getFullYear()
    );
    };

    const hasInactiveAppointment = (day: number) => {
        return orderedAppointments.some(
            (apt) =>
                apt.route.dateTimeRange.startDateTime < new Date() &&
                apt.route.dateTimeRange.startDateTime.getDate() === day &&
                apt.route.dateTimeRange.startDateTime.getMonth() === currentDate.getMonth() &&
                apt.route.dateTimeRange.startDateTime.getFullYear() === currentDate.getFullYear()
                //apt.date.getDate() >= new Date().getDate() &&
                //apt.date.getMonth() >= new Date().getMonth() &&
                //apt.date.getFullYear() >= new Date().getFullYear()
        );
    };

    const isToday = (day: number) => {
        const today = new Date();
        return (
            day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear()
        );
    };

    const isSelected = (day: number) => {
        return (
            selectedDate !== null &&
            day === selectedDate.getDate() &&
            currentDate.getMonth() === selectedDate.getMonth() &&
            currentDate.getFullYear() === selectedDate.getFullYear()
        );
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
        <div className="kalender">
            <div className="kalender-header">
                <button onClick={handlePreviousMonth}>← Forrige</button>
                <h2 className="kalender-title">
                    {currentDate.toLocaleDateString('da-DK', {
                        month: 'long',
                        year: 'numeric',
                    })}
                </h2>
                <button onClick={handleNextMonth}>Næste →</button>
            </div>

            <div className="kalender-weekdays">
                {['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'].map((day) => (
                    <div key={day} className="kalender-weekday">
                        {day}
                    </div>
                ))}
            </div>  

            <div className="kalender-days">
                {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="kalender-day other-month"></div>
                ))}

                {days.map((day) => (
                    <div
                        key={day}
                        onClick={() => handleDayClick(day)}
                        className={[
                            'kalender-day',
                            isToday(day) ? 'today' : '',
                            isSelected(day) ? 'selected' : '',
                            hasActiveAppointment(day) ? 'active-appointment' : '',
                            !hasActiveAppointment(day) && hasInactiveAppointment(day)
                                ? 'inactive-appointment'
                                : '',
                        ].join(' ')}
                    >
                        <div className="day-content">
                            <div className="day-number">{day}</div>

                            <div className="appointments-preview">
                                {orderedAppointments
                                    .filter(
                                        (apt) =>
                                            apt.route.dateTimeRange.startDateTime.getDate() === day &&
                                            apt.route.dateTimeRange.startDateTime.getMonth() === currentDate.getMonth() &&
                                            apt.route.dateTimeRange.startDateTime.getFullYear() === currentDate.getFullYear()
                                    )
                                    .slice(0, 5)
                                    .map((apt) => (
                                        <div key={apt.id} className="appointment-preview">
                                            { apt.route.dateTimeRange.startDateTime.getTime()}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Kalender;