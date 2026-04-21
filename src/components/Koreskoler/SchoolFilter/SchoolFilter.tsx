import React from "react"
import "./SchoolFilter.css"
import schoolViewModels from "../../Functions/SchoolList";
import DrivingSchoolViewModel from "../../../viewmodel/DrivingSchoolViewModel";


//
// function SchoolFilter() {
//
//     function filterList(): DrivingSchoolViewModel[] {
//         return schoolViewModels.filter(a => Number(a.pricing)<Number(currentPrice))
//     }
//
//     const [currentPrice, setCurrentPrice] = React.useState("20000");
//     const priceSlider= document.querySelector("#package-section");
//     const inputPrice= priceSlider?.querySelector("input");
//     /** Updates the value seen when user hovers over a slider
//      *
//      */
//     function updateCurrentPrice() {
//         try {
//             setCurrentPrice(inputPrice!.value);
//             filterList();
//         }
//         catch (e) {setCurrentPrice("");}
//     }
//     const [currentAvgPrice, setCurrentAvgPrice] = React.useState("30000");
//     const avgPriceSlider= document.querySelector("#avg-section");
//     const inputAvgPrice= avgPriceSlider?.querySelector("input");
//     function updateCurrentAvgPrice() {
//         try {setCurrentAvgPrice(inputAvgPrice!.value);}
//         catch (e) {setCurrentAvgPrice("");}
//     }
//
//
//
//     return (
//         <div className="filter-box">
//             <b>Filtrer søgeresultater</b>
//
//             <div id ="package-section">
//                 <b>Maks. pakkepris:</b>
//             <input id={"price"} type={"range"} min={5000} max={20000} step={100} name={"20000"} list={"prices"} title={currentPrice} defaultValue={20000} onChange={updateCurrentPrice}/>
//             <datalist id={"prices"}>
//                 <option value="5000" label="5000"></option>
//                 <option value="7500"></option>
//                 <option value="10000" label="10000"></option>
//                 <option value="12500"></option>
//                 <option value="15000" label="15000"></option>
//                 <option value="17500"></option>
//                 <option value="20000" label="20000"></option>
//             </datalist>
//             </div>
//
//             <div id="avg-section">
//                 <b>Maks. gennemsnitlig forløbspris:</b>
//             <input id={"avg-price"} type={"range"} min={5000} max={30000} step={100} name={"30000"} list={"avg-prices"} title={currentAvgPrice} defaultValue={30000} onChange={updateCurrentAvgPrice}/>
//             <datalist id={"avg-prices"}>
//                 <option value="5000"></option>
//                 <option value="10000" label="10000"></option>
//                 <option value="15000"></option>
//                 <option value="20000" label="20000"></option>
//                 <option value="25000"></option>
//                 <option value="30000" label="30000"></option>
//             </datalist>
//             </div>
//
//             <div id ="rating-section">
//                 <b>Antal stjerner:</b>
//             <input id={"rating"} type={"range"} min={0} max={5} step={1} list={"ratings"}/>
//             <datalist id={"ratings"}>
//                 <option value="0" label="0"></option>
//                 <option value="1" label="1"></option>
//                 <option value="2" label="2"></option>
//                 <option value="3" label="3"></option>
//                 <option value="4" label="4"></option>
//                 <option value="5" label="5"></option>
//             </datalist>
//             </div>
//
//             <div id ="pass-rate-section">
//                 <b>Mindste gennemførselsprocent:</b>
//                 <input id={"pass-rate"} type={"range"} min={50} max={100} step={1} list={"pass-rates"}/>
//                 <datalist id={"pass-rates"}>
//                     <option value="50" label="50"></option>
//                     <option value="60" label="60"></option>
//                     <option value="70" label="70"></option>
//                     <option value="80" label="80"></option>
//                     <option value="90" label="90"></option>
//                     <option value="100" label="100"></option>
//                 </datalist>
//             </div>
//
//             {/*<div className="filterchecklist">*/}
//             {/*    Klassifikation:*/}
//             {/*    <label><span>AM</span><input type="checkbox"/></label>*/}
//             {/*    <label><span>A1</span><input type="checkbox"/></label>*/}
//             {/*    <label><span>A2</span><input type="checkbox"/></label>*/}
//             {/*    <label><span>A</span><input type="checkbox"/></label>*/}
//             {/*    <label><span>B1</span><input type="checkbox"/></label>*/}
//             {/*    <label><span>B (bil)</span><input type="checkbox"/></label>*/}
//             {/*    <label><span>C1</span><input type="checkbox"/></label>*/}
//             {/*    <label><span>C</span><input type="checkbox"/></label>*/}
//             {/*    <label><span>D1</span><input type="checkbox"/></label>*/}
//             {/*    <label><span>D</span><input type="checkbox"/></label>*/}
//             {/*    <label><span>BE</span><input type="checkbox"/></label>*/}
//             {/*    <label><span>C1E</span><input type="checkbox"/></label>*/}
//             {/*    <label><span>CE</span><input type="checkbox"/></label>*/}
//             {/*    <label><span>D1E</span><input type="checkbox"/></label>*/}
//             {/*    <label><span>DE</span><input type="checkbox"/></label>*/}
//             {/*</div>*/}
//             <div className="filterchecklist">
//                 <b>Region:</b>
//                 <label><span>Hovedstaden</span><input type="checkbox"/></label>
//                 <label><span>Sjælland</span><input type="checkbox"/></label>
//                 <label><span>Syddanmark</span><input type="checkbox"/></label>
//                 <label><span>Midtjylland</span><input type="checkbox"/></label>
//                 <label><span>Nordjylland</span><input type="checkbox"/></label>
//             </div>
//
//             {/*<div>*/}
//             {/*    <button className="filter-button">*/}
//             {/*        Filtrér resultater*/}
//             {/*    </button>*/}
//             {/*</div>*/}
//         </div>
//     );
// }
// export default SchoolFilter;