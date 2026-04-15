import React from "react";
import "./Koreskoler.css";
import SchoolFilter from "../components/Koreskoler/SchoolFilter/SchoolFilter";
import SchoolResults from "../components/Koreskoler/SchoolResults/SchoolResults";



function Koreskoler() {
    const [active, setActive] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");
    const resultBox = SchoolResults(searchTerm);
    // const input = document.querySelector("input");
    function updateSearchTerm() {
        // try {setSearchTerm(input!.value);}
        // catch (error) {setSearchTerm("")}
        setActive(true);
    }
    return (
        <div className="koreskoler-page">
            <div className="left-column">
                <SchoolFilter />
            </div>


            <div className="right-column">
                <div className="school-search">
                    <div className="search-box">
                        <h2>Find køreskole</h2>
                        <input
                            id="search-text"
                            type="text"
                            placeholder="Køreskolens navn"
                            className="search-input"
                            defaultValue={searchTerm}
                        />
                        <button className="search-button" onClick={() => updateSearchTerm()}>
                            Søg
                        </button>
                    </div>
                </div>

                <p>Søgeresultater</p>
                {active && resultBox}
            </div>

        </div>

    );
}

export default Koreskoler;