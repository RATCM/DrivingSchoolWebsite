import React from "react";
import "./MyDrivingSchoolBox.css";

function MyDrivingSchoolBox() {
    const DrivingSchool = {
        tlf: "+45 11 22 33 44",
        email: "køreskole@gmail.com"
    }
    const DrivingInstructor = {
        tlf: "+45 11 22 33 44",
        email: "kørelærer@gmail.dk"
    }


    return (
        <div className="cardBox">
            <h2>Kontakt</h2>

            <p><b>Køreskole kontakt info</b></p>
            <p>Tlf: {DrivingSchool.tlf}</p>
            <p>Email: {DrivingSchool.email}</p>

            <p style={{marginTop:20}}><b>Kørelærer kontakt info</b></p>
            <p>Tlf: {DrivingInstructor.tlf}</p>
            <p>Email: {DrivingInstructor.email}</p>
        </div>
        );
}

export default MyDrivingSchoolBox;