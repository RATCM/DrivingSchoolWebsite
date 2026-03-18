import React from "react";
import Select from "react-select";
import "./Booking.css";


function handleclick() {
    alert("Forespørgsel sendt!");
}

function Booking() {
    const options = [
        //{ value: 'nat', label: 'Natkørsel' },
        { value: 'drivinglesson', label: 'Køretime' },
        { value: 'bane', label: 'Banekørsel' },
        { value: 'glatbane', label: 'Glatbane' },
        //{ value: 'motorvej', label: 'Motorvejskørsel' },
        { value: 'firstaid', label: 'Førstehjælp' },
        { value: 'teoritest', label: 'Teoriprøve' },
        { value: 'drivingtest', label: 'Køreprøve' }
    ]
    return (


            <div className="booking-box">
                <h1>Forespørg en køretime</h1>
                <h2>Type</h2>

                <Select options={options} />

                <h2>Dato og tid</h2>
                <input
                    type="date"
                    placeholder="Dato"
                    className="booking-input"
                />

                <input
                    type="time"
                    placeholder="Tid"
                    className="booking-input"
                />
                <button className="booking-button"onClick={() => {handleclick()}}>
                    Forespørg
                </button>


            </div>


    );

}
export default Booking;