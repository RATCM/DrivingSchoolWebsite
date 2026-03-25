import React from 'react';
import "./MyProgressBox.css";
import history from "../../Functions/History";

function MyProgressBox() {
    
    const total = 16;
    const totalCompleted = history();
    const progress = totalCompleted.filter(a => a.type === "Køretime").length+totalCompleted.filter(a => a.type === "Natkørsel").length+totalCompleted.filter(a => a.type === "Motorvej").length;
    const hastype = (type:string) => totalCompleted.some(a => a.type === type);

    return (
        <div className="cardBox">
            <h1><b>Hvor langt er jeg</b></h1>

            <h3>Køretimer</h3>

            <div className="myprogressBar">
                <div className="myprogressFill"
                style={{ width: `${(progress / total) * 100}%` }}
                />
            </div>

            <p className="myprogressText">
                Du har fuldført {progress} ud af {total} køretimer
            </p>

            <h3 style={{marginTop:20}}>Checkliste</h3>

            <div className="mychecklist">
                <label><span>Banekørsel</span>
                <input type="checkbox" checked={hastype("Banekørsel")} readOnly/></label>
                <label><span>Glatbane</span><input type="checkbox" checked={hastype("Glatbane")} readOnly/></label>
                <label><span>Natkørsel</span><input type="checkbox" checked={hastype("Natkørsel")} readOnly/></label>
                <label><span>Motorvej</span><input type="checkbox" checked={hastype("Motorvej")} readOnly/></label>
                <label><span>Førstehjælp</span><input type="checkbox" checked={hastype("Førstehjælp")} readOnly/></label>
                <label><span>Teoriprøve</span><input type="checkbox" checked={hastype("Teoriprøve")} readOnly/></label>
                <label><span>Køreprøve</span><input type="checkbox" checked={hastype("Køreprøve")} readOnly/></label>
            </div>
        </div>
    );
}

export default MyProgressBox;
