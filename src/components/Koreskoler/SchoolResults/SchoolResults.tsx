import DrivingSchoolModel from "../../../model/DrivingSchoolModel";
import StreetsAddressModel from "../../../model/Submodels/StreetsAddressModel";
import Package from "../../../model/Submodels/Package";
import Pricing from "../../../model/Submodels/Pricing";
import {mapDrivingSchoolViewModel} from "../../../viewmodel/DrivingSchoolViewModel";
import "./SchoolResults.css"
import React from "react";
import "../../Functions/SchoolList"

function SchoolResultBox() {
    const drivingSchool = new DrivingSchoolModel("0","Jens' bedste skole","12 34 56 78","jens@skole.dk", new StreetsAddressModel("Skolestrædet 3","2800","Lyngby","Hovedstaden"), [new Package("ab","ab",new Pricing(0,"DKK"))]);
    const vm = mapDrivingSchoolViewModel(drivingSchool);

    // const filtreretliste = liste.filter(a => a.navn.includes("blahblah"))
    return (
        <div>

        <p style={{marginTop:20}}><b>{vm.schoolName}</b></p>
                <p>Adresse: {vm.address}</p>
                <p>Tlf: {vm.phone}</p>
                <p>Hjemmeside: {vm.website}</p>
        </div>
);
}

export default SchoolResultBox;