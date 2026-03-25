import DrivingSchoolModel from "../../../model/DrivingSchoolModel";
import {mapDrivingSchoolViewModel} from "../../../viewmodel/DrivingSchoolViewModel";
import "./SchoolResults.css"
import React from "react";
import "../../Functions/SchoolList"

function SchoolResultBox() {
    const drivingSchool = new DrivingSchoolModel("Jens' bedste skole","12 34 56 78","jens@skole.dk", "Skolestrædet 3", "Nord", 5000);
    const drivingSchool2Cool = new DrivingSchoolModel("Oles værste skole","12 12 34 34","ole@skole.dk", "Skolestrædet 3", "Syd", 10000);
    const vm = mapDrivingSchoolViewModel(drivingSchool);

    // const filtreretliste = liste.filter(a => a.navn.includes("blahblah"))
    return (
        <div>

        <p style={{marginTop:20}}><b>{vm.schoolName}</b></p>
                <p>Adresse: {vm.address}</p>
                <p>Tlf: {vm.phone}</p>
                <p>Hjemmeside: {vm.website}</p>
                <p>Pakkepris: {vm.pricing} kroner</p>
        </div>
);
}

export default SchoolResultBox;