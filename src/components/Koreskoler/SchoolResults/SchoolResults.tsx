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
                    <p><b>Adresse:</b> {vm.address}</p>
                    <p><b>Tlf:</b> {vm.phone}</p>
                    <p><b>Hjemmeside:</b> {vm.website}</p>
                    <p><b>Billigste pakke:</b> {vm.packages} DKK</p>
                    <p><b>Gennemsnitlig forløbspris:</b> {vm.avgPrice} DKK</p>
                    <p><b>Beståelsesprocent:</b> {vm.passRate}%</p>
                </div>
            )));
}

export default SchoolResults;