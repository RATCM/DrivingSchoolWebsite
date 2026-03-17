import React from "react"
import "./SchoolFilter.css"

function SchoolFilter() {
    return (
        <div className="filter-box">
            <b>Filtrer søgeresultater</b>
            <div className="filterchecklist">
                Klassifikation:
                <label><span>AM</span><input type="checkbox"/></label>
                <label><span>A1</span><input type="checkbox"/></label>
                <label><span>A2</span><input type="checkbox"/></label>
                <label><span>A</span><input type="checkbox"/></label>
                <label><span>B1</span><input type="checkbox"/></label>
                <label><span>B (bil)</span><input type="checkbox"/></label>
                <label><span>C1</span><input type="checkbox"/></label>
                <label><span>C</span><input type="checkbox"/></label>
                <label><span>D1</span><input type="checkbox"/></label>
                <label><span>D</span><input type="checkbox"/></label>
                <label><span>BE</span><input type="checkbox"/></label>
                <label><span>C1E</span><input type="checkbox"/></label>
                <label><span>CE</span><input type="checkbox"/></label>
                <label><span>D1E</span><input type="checkbox"/></label>
                <label><span>DE</span><input type="checkbox"/></label>
            </div>
        </div>
    );
}
export default SchoolFilter;