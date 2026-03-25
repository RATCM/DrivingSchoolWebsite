import React from "react";
import "./Koreskoler.css";
import SchoolFilter from "../components/Koreskoler/SchoolFilter/SchoolFilter";
import SchoolSearch from "../components/Koreskoler/SchoolSearch/SchoolSearch";
import SchoolResultBox from "../components/Koreskoler/SchoolResults/SchoolResults";

function Koreskoler() {
    return (
        <div className="koreskoler-page">
            <div className="left-column">
                <SchoolFilter />
            </div>


            <div className="right-column">
                <h1>Velkommen</h1>
                <p>Det her er Køreskoler siden</p>
                < SchoolSearch/>
                <p>Søgeresultater</p>
                {/*hacky horizontal linje*/}
                _______________________________________________________________________________________________________________________________________________________________________
                < SchoolResultBox />
            </div>

        </div>

    );
}

export default Koreskoler;