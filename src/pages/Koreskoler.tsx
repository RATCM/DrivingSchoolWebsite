import React from "react";
import "./Koreskoler.css";
import SchoolResults from "../components/Koreskoler/SchoolResults/SchoolResults";
import DrivingSchoolViewModel, {mapDrivingSchoolViewModel} from "../viewmodel/DrivingSchoolViewModel";
import {apiRequest} from "../Api/apiRequest";
import DrivingSchoolGetDTO from "../DTO/DrivingSchoolGetDTO";
import RatingGetDTO from "../DTO/RatingGetDTO";
import GetDTOtoModel from "../Mappers/GetDTOtoModel";
import DrivingSchoolModel from "../model/DrivingSchoolModel";


function Koreskoler() {
    const [drivingSchoolViewModels, setDrivingSchoolViewModels] = React.useState<DrivingSchoolViewModel[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState("");

    async function getAllDrivingSchools() {
        try {
            const data = await apiRequest<DrivingSchoolGetDTO[]>("drivingschool");
            const drivingSchoolArray = data.map((dto) => GetDTOtoModel(dto));
            let viewModelArray: DrivingSchoolViewModel[] = [];
            for (let i = 0; i < drivingSchoolArray.length; i++) {
                const result = await getDrivingSchoolRatings(drivingSchoolArray[i])
                viewModelArray.push(mapDrivingSchoolViewModel(drivingSchoolArray[i],`${result[0].toFixed(2)}` ,`${result[1].toFixed(2)}`))
            }
            setLoading(false);
            setDrivingSchoolViewModels(viewModelArray);
        } catch (err) {
            console.error(err);
            setError("Fejl ved indlæsning af køreskoler ");
        }
    }

    const getDrivingSchoolRatings = async (model: DrivingSchoolModel): Promise<number[]> => {
        try {
            const data = await apiRequest<RatingGetDTO>(`drivingschool/${model.id}/rating`);
            return [data.passRate*100,data.averagePrice.amount]
        } catch (err) {
            console.error(err);
            setError("Fejl ved indlæsning af køreskoler ");
            return [0,10];
        }
    }

    React.useEffect(() => {
            if (loading) {
                getAllDrivingSchools();
            }
        }
    )


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
    function onEnter(e: React.KeyboardEvent) {
        if (e.code === "Enter") {updateSearchTerm()}
    }


    //This block reads values of sliders in filter box and displays their current value when hovered over
    const [currentPrice, setCurrentPrice] = React.useState("30000");
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
    const [currentPassRate, setCurrentPassRate] = React.useState("0");
    const passRateSlider= document.querySelector("#pass-rate-section");
    const inputPassRate= passRateSlider?.querySelector("input");
    function updateCurrentPassRate() {
        try {setCurrentPassRate(inputPassRate!.value);}
        catch (e) {setCurrentPassRate("");}
    }

    const [currentCity, setCurrentCity] = React.useState("");
    const cityDropDown = document.querySelector("#city-dropdown");
    const inputCity = cityDropDown?.querySelector("select")
    function updateCurrentCity() {
        try {setCurrentCity(inputCity!.value);}
        catch (e) {setCurrentCity("");}
    }

    /*generates selectable options in the dropdown that filters by city*/
    function cityDropDownList() {
        return drivingSchoolViewModels.map(e => {
            return <option value={e.addressCity}>{e.addressCity}</option>
        })
    }

    //filtering and sorting
    function filterList(): DrivingSchoolViewModel[] {
        return drivingSchoolViewModels.filter(a => Number(a.pricing)<Number(currentPrice))
            .filter(a => Number(a.avgPrice)<=Number(currentAvgPrice))
            .filter(a => Number(a.passRate)>=Number(currentPassRate))
            .filter(a => a.addressCity.toLowerCase().includes(currentCity.toLowerCase()));
    }
    const [sortOption, setSortOption] = React.useState("alphabetical");
    const sortDropDown= document.querySelector("#sort-results");
    const inputSort= sortDropDown?.querySelector("select");
    function updateSortOption() {
        try {setSortOption(inputSort!.value);}
        catch (e) {setSortOption("");}
    }
    function sortList(list: DrivingSchoolViewModel[]): DrivingSchoolViewModel[] {
        switch (sortOption) {
            case "alphabetical": return list.sort((a,b) => {
                if (a.schoolName.toLowerCase() < b.schoolName.toLowerCase()) {
                    return -1;
                }
                if (a.schoolName.toLowerCase() > b.schoolName.toLowerCase()) {
                    return 1;
                }
                return 0;
            })
            case "alphabetical-reverse": return list.sort((a,b) => {
                if (a.schoolName.toLowerCase() > b.schoolName.toLowerCase()) {
                    return -1;
                }
                if (a.schoolName.toLowerCase() < b.schoolName.toLowerCase()) {
                    return 1;
                }
                return 0;
            })
            case "package-ascending": return list.sort((a,b) => Number(a.pricing) - Number(b.pricing))
            case "package-descending": return list.sort((a,b) => Number(b.pricing) - Number(a.pricing))
            case "avg-ascending": return list.sort((a,b) => Number(a.avgPrice) - Number(b.avgPrice))
            case "avg-descending": return list.sort((a,b) => Number(b.avgPrice) - Number(a.avgPrice))
            case "pass-rate-descending": return list.sort((a,b) => Number(b.passRate) - Number(a.passRate))
            default: return list;
        }

    }

    const resultBox = SchoolResults(searchTerm, sortList(filterList()));
    const matchingResults = filterList().filter(a => a.schoolName.toLowerCase().includes(searchTerm.toLowerCase())).length;
    function pluralResults(): string {
        if (matchingResults !== 1 && currentCity === "") {
            return  `es`
        }
        if (matchingResults !== 1 && currentCity !== "") {
            return `es i ${currentCity}`
        }
        if (matchingResults === 1 && currentCity !== "") {
            return ` i ${currentCity}`
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
                        <input id={"price"} type={"range"} min={0} max={30000} step={100} name={"20000"} list={"prices"} title={currentPrice} defaultValue={30000} onChange={updateCurrentPrice}/>
                        <datalist id={"prices"}>
                            <option value="0" label="0"></option>
                            <option value="5000"></option>
                            <option value="10000" label="10000"></option>
                            <option value="15000"></option>
                            <option value="20000" label="20000"></option>
                            <option value="25000"></option>
                            <option value="30000" label="30000"></option>
                        </datalist>
                    </div>

                    <div id="avg-section">
                        <b>Maks. gennemsnitlig forløbspris:</b>
                        <input id={"avg-price"} type={"range"} min={0} max={30000} step={100} name={"30000"} list={"avg-prices"} title={currentAvgPrice} defaultValue={30000} onChange={updateCurrentAvgPrice}/>
                        <datalist id={"avg-prices"}>
                            <option value="0" label="0"></option>
                            <option value="5000"></option>
                            <option value="10000" label="10000"></option>
                            <option value="15000"></option>
                            <option value="20000" label="20000"></option>
                            <option value="25000"></option>
                            <option value="30000" label="30000"></option>
                        </datalist>
                    </div>

                    <div id ="pass-rate-section">
                        <b>Min. gennemførselsprocent:</b>
                        <input id={"pass-rate"} type={"range"} min={0} max={100} step={1} list={"pass-rates"} title={currentPassRate} defaultValue={0} onChange={updateCurrentPassRate}/>
                        <datalist id={"pass-rates"}>
                            <option value="0" label="0"></option>
                            <option value="20" label="20"></option>
                            <option value="40" label="40"></option>
                            <option value="60" label="60"></option>
                            <option value="80" label="80"></option>
                            <option value="100" label="100"></option>
                        </datalist>
                    </div>

                    <div className="city-dropdown" id="city-dropdown">
                        <b>Lokation:</b>
                        <label htmlFor="city-dropdown"> </label>
                        <p>
                        <select name="city" id="city-select" onChange={updateCurrentCity}>
                            <option value={""}>--Vælg kommune--</option>
                            {cityDropDownList()}
                        </select>
                        </p>
                    </div>

                </div>
            </div>


            <div className="right-column">
                <div className="school-search">
                    <div className="search-box" id="search-box">
                        <h2>Find køreskole</h2>
                        <input
                            id="search-text"
                            type="text"
                            placeholder="Køreskolens navn"
                            className="search-input"
                            defaultValue={""}
                            onKeyUp={e => onEnter(e)}
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
                                <strong>Din søgning gav {matchingResults} match{pluralResults()}:</strong>
                            </div>
                            <div className="sort-results" id={"sort-results"}>
                                <label htmlFor="sort-dropdown">Sortér: </label>
                                <select name="sort" id="sort-dropdown" onChange={() => updateSortOption()}>
                                    <option value="alphabetical">Alfabetisk A-Z</option>
                                    <option value="alphabetical-reverse">Alfabetisk Z-A</option>
                                    <option value="package-ascending">Laveste pakkepris</option>
                                    <option value="package-descending">Højeste pakkepris</option>
                                    <option value="avg-ascending">Laveste gennemsnitspris</option>
                                    <option value="avg-descending">Højeste gennemsnitspris</option>
                                    <option value="pass-rate-descending">Højeste beståelsesprocent</option>
                                </select>
                            </div>
                            {/*<button className="cancel-search" onClick={() => setActive(false)}>X</button>*/}
                        </div>
                    }
                </div>
                <div className={"school-results"}>
                    {active && resultBox}
                    {error && <p>{error}</p>}
                </div>

            </div>

        </div>

    );
}

export default Koreskoler;