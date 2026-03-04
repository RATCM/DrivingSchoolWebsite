import React from "react";
import Select from "react-select";
import "./Booking.css";


function Booking() {
    const options = [
        { value: 'nat', label: 'Natkørsel' },
        { value: 'bane', label: 'Banekørsel' },
        { value: 'glatbane', label: 'Glatbane' },
        { value: 'motorvej', label: 'Motorvejskørsel' },
        { value: 'firstaid', label: 'Førstehjælp' },
        { value: 'teoritest', label: 'Teoriprøve' },
        { value: 'drivingtest', label: 'Køreprøve' }
    ]
    return (
        <div className="Booking-page">
            <div className="Booking-box">
                <h2>Type</h2>

                <Select options={options} />

                <h2>Dato og tid</h2>
                <input
                    type="date"
                    placeholder="Dato"
                    className="Booking-input"
                />

                <input
                    type="time"
                    placeholder="Tid"
                    className="Booking-input"
                />

                <button className="Booking-button">
                    Book time
                </button>
            </div>
        </div>
    );
}

export default Booking;