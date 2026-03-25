import DrivingSchoolModel from "../../../model/DrivingSchoolModel";
import {mapDrivingSchoolViewModel} from "../../../viewmodel/DrivingSchoolViewModel";
import "./SchoolResults.css"
import React from "react";
import "../../Functions/SchoolList"
import SchoolList from "../../Functions/SchoolList";

function SchoolResultBox() {

    const drivingSchoolList = SchoolList
    // const filtreretliste:  = drivingSchoolList.filter(a => a.navn.includes(searchTerm))

    return (
        <div>



        {/*<p style={{marginTop:20}}><b>{vm.schoolName}</b></p>*/}
        {/*        <p>Adresse: {vm.address}</p>*/}
        {/*        <p>Tlf: {vm.phone}</p>*/}
        {/*        <p>Hjemmeside: {vm.website}</p>*/}
        {/*        <p>Pakkepris: {vm.pricing} kroner</p>*/}
        </div>
);
}

export default SchoolResultBox;