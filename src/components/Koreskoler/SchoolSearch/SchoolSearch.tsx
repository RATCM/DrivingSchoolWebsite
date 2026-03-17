import React from "react";
import "./SchoolSearch.css"

function SchoolSearch() {

    return (
        <div className="school-search">
            <div className="search-box">
                <h2>Find køreskole</h2>

                <input
                    type="search-name"
                    placeholder="Køreskolens navn"
                    className="search-input"
                />

                <button className="search-button">
                    Søg
                </button>
            </div>
        </div>
    );
}

export default SchoolSearch;
