import "./SchoolResults.css"
import React from "react";
import "../../Functions/SchoolList"
import schoolViewModels from "../../Functions/SchoolList";

function SchoolResults(searchTerm: string|null) {

    const filterTerm = searchTerm || ""
    const filteredList= schoolViewModels.filter(a => a.schoolName.toLowerCase().includes(filterTerm.toLowerCase()))


    return (
        filteredList.map((vm, i) => (
                <div className="Køreskole" key={i}>
                    <p><b>{vm.schoolName}</b></p>
                    <p>Adresse: {vm.address}</p>
                    <p>Tlf: {vm.phone}</p>
                    <p>Hjemmeside: {vm.website}</p>
                    <p>Pakkepris: {vm.pricing}</p>

                </div>
            )));
}

export default SchoolResults;