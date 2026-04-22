import React from "react";
import "./Koreskoler.css";
import SchoolResults from "../components/Koreskoler/SchoolResults/SchoolResults";
import "../components/Functions/SchoolList"
import DrivingSchoolViewModel from "../viewmodel/DrivingSchoolViewModel";
import schoolViewModels from "../components/Functions/SchoolList";


function Koreskoler() {

    //This block handles the search box content
    const [active, setActive] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");
    const inputBox = document.querySelector("#search-box");
    const inputText = inputBox?.querySelector("input");
    function updateSearchTerm() {
        try {setSearchTerm(inputText!.value);}
        catch (error) {setSearchTerm("")}
        setActive(true);
    }

    //This block reads values of sliders in filter box and displays their current value when hovered over
    const [currentPrice, setCurrentPrice] = React.useState("20000");
    const priceSlider= document.querySelector("#package-section");
    const inputPrice= priceSlider?.querySelector("input");
    function updateCurrentPrice() {
        try {
            setCurrentPrice(inputPrice!.value);
        }
        catch (e) {setCurrentPrice("");}
    }
    const [currentAvgPrice, setCurrentAvgPrice] = React.useState("30000");
    const avgPriceSlider= document.querySelector("#avg-section");
    const inputAvgPrice= avgPriceSlider?.querySelector("input");
    function updateCurrentAvgPrice() {
        try {setCurrentAvgPrice(inputAvgPrice!.value);}
        catch (e) {setCurrentAvgPrice("");}
    }
    const [currentPassRate, setCurrentPassRate] = React.useState("50");
    const passRateSlider= document.querySelector("#pass-rate-section");
    const inputPassRate= passRateSlider?.querySelector("input");
    function updateCurrentPassRate() {
        try {setCurrentPassRate(inputPassRate!.value);}
        catch (e) {setCurrentPassRate("");}
    }


    function filterList(): DrivingSchoolViewModel[] {
        return schoolViewModels.filter(a => Number(a.pricing)<Number(currentPrice))
    }
    const resultBox = SchoolResults(searchTerm, filterList());
    const matchingResults = filterList().filter(a => a.schoolName.toLowerCase().includes(searchTerm.toLowerCase())).length;
    function pluralResults(): string {
        if (matchingResults !== 1) {
            return "er"
        }
        return ""
    }


    return (
        <div className="koreskoler-page">
            <div className="left-column">
                <div className="filter-box">
                    <b>Filtrer søgeresultater</b>

                    <div id ="package-section">
                        <b>Maks. pakkepris:</b>
                        <input id={"price"} type={"range"} min={5000} max={20000} step={100} name={"20000"} list={"prices"} title={currentPrice} defaultValue={20000} onChange={updateCurrentPrice}/>
                        <datalist id={"prices"}>
                            <option value="5000" label="5000"></option>
                            <option value="7500"></option>
                            <option value="10000" label="10000"></option>
                            <option value="12500"></option>
                            <option value="15000" label="15000"></option>
                            <option value="17500"></option>
                            <option value="20000" label="20000"></option>
                        </datalist>
                    </div>

                    <div id="avg-section">
                        <b>Maks. gennemsnitlig forløbspris:</b>
                        <input id={"avg-price"} type={"range"} min={5000} max={30000} step={100} name={"30000"} list={"avg-prices"} title={currentAvgPrice} defaultValue={30000} onChange={updateCurrentAvgPrice}/>
                        <datalist id={"avg-prices"}>
                            <option value="5000"></option>
                            <option value="10000" label="10000"></option>
                            <option value="15000"></option>
                            <option value="20000" label="20000"></option>
                            <option value="25000"></option>
                            <option value="30000" label="30000"></option>
                        </datalist>
                    </div>

                    {/*<div id ="rating-section">*/}
                    {/*    <b>Antal stjerner:</b>*/}
                    {/*    <input id={"rating"} type={"range"} min={0} max={5} step={1} list={"ratings"}/>*/}
                    {/*    <datalist id={"ratings"}>*/}
                    {/*        <option value="0" label="0"></option>*/}
                    {/*        <option value="1" label="1"></option>*/}
                    {/*        <option value="2" label="2"></option>*/}
                    {/*        <option value="3" label="3"></option>*/}
                    {/*        <option value="4" label="4"></option>*/}
                    {/*        <option value="5" label="5"></option>*/}
                    {/*    </datalist>*/}
                    {/*</div>*/}

                    <div id ="pass-rate-section">
                        <b>Mindste gennemførselsprocent:</b>
                        <input id={"pass-rate"} type={"range"} min={50} max={100} step={1} list={"pass-rates"} title={currentPassRate} defaultValue={50} onChange={updateCurrentPassRate}/>
                        <datalist id={"pass-rates"}>
                            <option value="50" label="50"></option>
                            <option value="60" label="60"></option>
                            <option value="70" label="70"></option>
                            <option value="80" label="80"></option>
                            <option value="90" label="90"></option>
                            <option value="100" label="100"></option>
                        </datalist>
                    </div>

                    {/*<div className="filterchecklist">*/}
                    {/*    Klassifikation:*/}
                    {/*    <label><span>AM</span><input type="checkbox"/></label>*/}
                    {/*    <label><span>A1</span><input type="checkbox"/></label>*/}
                    {/*    <label><span>A2</span><input type="checkbox"/></label>*/}
                    {/*    <label><span>A</span><input type="checkbox"/></label>*/}
                    {/*    <label><span>B1</span><input type="checkbox"/></label>*/}
                    {/*    <label><span>B (bil)</span><input type="checkbox"/></label>*/}
                    {/*    <label><span>C1</span><input type="checkbox"/></label>*/}
                    {/*    <label><span>C</span><input type="checkbox"/></label>*/}
                    {/*    <label><span>D1</span><input type="checkbox"/></label>*/}
                    {/*    <label><span>D</span><input type="checkbox"/></label>*/}
                    {/*    <label><span>BE</span><input type="checkbox"/></label>*/}
                    {/*    <label><span>C1E</span><input type="checkbox"/></label>*/}
                    {/*    <label><span>CE</span><input type="checkbox"/></label>*/}
                    {/*    <label><span>D1E</span><input type="checkbox"/></label>*/}
                    {/*    <label><span>DE</span><input type="checkbox"/></label>*/}
                    {/*</div>*/}
                    <div className="filterchecklist">
                        <b>Region:</b>
                        <label><span>Hovedstaden</span><input type="checkbox"/></label>
                        <label><span>Sjælland</span><input type="checkbox"/></label>
                        <label><span>Syddanmark</span><input type="checkbox"/></label>
                        <label><span>Midtjylland</span><input type="checkbox"/></label>
                        <label><span>Nordjylland</span><input type="checkbox"/></label>
                    </div>

                    {/*<div>*/}
                    {/*    <button className="filter-button">*/}
                    {/*        Filtrér resultater*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
            </div>


            <div className="right-column">
                <div className="school-search">
                    <div className="search-box" id = "search-box">
                        <h2>Find køreskole</h2>
                        <input
                            id="search-text"
                            type="text"
                            placeholder="Køreskolens navn"
                            className="search-input"
                            defaultValue={""}
                        />
                        <button className="search-button" onClick={() => updateSearchTerm()}>
                            Søg
                        </button>

                    </div>
                </div>
                <div>
                    {active &&
                        <div className="result-header">
                            <div className="result-header-text">
                                <strong>Din søgning gav {matchingResults} resultat{pluralResults()}:</strong>
                            </div>
                            {/*<button className="cancel-search" onClick={() => setActive(false)}>X</button>*/}
                        </div>
                    }
                </div>
                <div className={"school-results"}>
                    {active && resultBox}
                </div>

            </div>

        </div>

    );
}

export default Koreskoler;