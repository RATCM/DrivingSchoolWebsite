import React from 'react';
import "./MyProgressBox.css";

function MyProgressBox() {
    const progress = 4;
    const total = 14;
    return (
        <div className="cardBox">
            <h1><b>Hvor langt er jeg</b></h1>

            <h3>Køretimer</h3>

            <div className="myprogressBar">
                <div className="myprogressFill"/>
            </div>

            <p className="myprogressText">
                Du har fuldført {progress} ud af {total} køretimer
            </p>

            <h3 style={{marginTop:20}}>Checkliste</h3>

            <div className="mychecklist">
                <label><span>Banekørsel</span><input type="checkbox"/></label>
                <label><span>Glatbane</span><input type="checkbox"/></label>
                <label><span>Natkørsel</span><input type="checkbox"/></label>
                <label><span>Motorvej</span><input type="checkbox"/></label>
                <label><span>Førstehjælp</span><input type="checkbox"/></label>
                <label><span>Teoriprøve</span><input type="checkbox"/></label>
                <label><span>Køreprøve</span><input type="checkbox"/></label>
            </div>
        </div>
    );
}

export default MyProgressBox;
