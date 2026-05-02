import "./SchoolResults.css"
import React from "react";
import drivingSchoolViewModel from "../../../viewmodel/DrivingSchoolViewModel";

function SchoolResults(searchTerm: string|null, schoolViewModels: drivingSchoolViewModel[]) {

    const filterTerm = searchTerm || ""
    const filteredList= schoolViewModels.filter(a => a.schoolName.toLowerCase().includes(filterTerm.toLowerCase()))


    return (
        filteredList.map((vm, i) => (
                <div className="koreskole" key={i}>
                    <p><b>{vm.schoolName}</b></p>
                    <p>Adresse: {vm.address}</p>
                    <p>Tlf: {vm.phone}</p>
                    <p>Hjemmeside: {vm.website}</p>
                    {/*<p>Pakkepris: {vm.pricing}</p>*/}
                </div>
            )));
}

export default SchoolResults;