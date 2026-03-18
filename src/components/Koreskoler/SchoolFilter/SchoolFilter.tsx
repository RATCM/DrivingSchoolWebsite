import React from "react"
import "./SchoolFilter.css"

function SchoolFilter() {

    return (
        <div className="filter-box">
            <b>Filtrer søgeresultater</b>

            Pakkepris:
            <input id={"price"} type={"range"} min={5000} max={20000} step={100} name={"20000"} list={"prices"}/>
            <datalist id={"prices"}>
                <option value="5000" label="5000"></option>
                <option value="7500"></option>
                <option value="10000" label="10000"></option>
                <option value="12500"></option>
                <option value="15000" label="15000"></option>
                <option value="17500"></option>
                <option value="20000" label="20000"></option>
            </datalist>

            Antal stjerner:
            <input id={"rating"} type={"range"} min={0} max={5} step={1} list={"ratings"}/>
            <datalist id={"ratings"}>
                <option value="0" label="0"></option>
                <option value="1" label="1"></option>
                <option value="2" label="2"></option>
                <option value="3" label="3"></option>
                <option value="4" label="4"></option>
                <option value="5" label="5"></option>
            </datalist>

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