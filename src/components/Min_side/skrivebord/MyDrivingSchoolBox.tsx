import React from "react";
import "./MyDrivingSchoolBox.css";
import "../../../model/InstructorModel.ts";
import InstructorModel from "../../../model/InstructorModel";
import {mapUserViewModel} from "../../../viewmodel/UserViewModel";

function MyDrivingSchoolBox() {
    const drivingInstructor = new InstructorModel("albert","albert@dtu.dk","fghjkjhghjklhgfghj", "+45 11 22 33 44", null);
    const vm = mapUserViewModel(drivingInstructor);
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
            <p>Tlf: {vm.phone}</p>
            <p>Email: {vm.email}</p>
        </div>
        );
}

export default MyDrivingSchoolBox;