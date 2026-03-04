import React from "react";
import "./MyDrivingSchoolBox.css";
import "../../../model/InstructorModel.ts";
import InstructorModel from "../../../model/InstructorModel";

function MyDrivingSchoolBox() {
    const drivingInstructor = new InstructorModel("albert","albert@dtu.dk","fghjkjhghjklhgfghj", 111222333, null);
    const DrivingSchool = {
        tlf: "+45 11 22 33 44",
        email: "køreskole@gmail.dk"
    }


    return (
        <div className="cardBox">
            <h2>Kontakt</h2>

            <p><b>Køreskole kontakt info</b></p>
            <p>Tlf: {DrivingSchool.tlf}</p>
            <p>Email: {DrivingSchool.email}</p>

            <p style={{marginTop:20}}><b>Kørelærer kontakt info</b></p>
            <p>Tlf: {drivingInstructor.phone}</p>
            <p>Email: {drivingInstructor.email}</p>
        </div>
        );
}

export default MyDrivingSchoolBox;