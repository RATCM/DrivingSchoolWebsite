import React from "react";
import "./MyProgressBox.css";
import { useHistory } from "../../Functions/History";

function MyProgressBox() {
    const total = 16;
    const { history, loading, error } = useHistory();

    const progress = history.length;

    const hasObjective = (
        objective: keyof typeof history[number]["completedObjectives"]
    ) => {
        return history.some(
            lesson => lesson.completedObjectives?.[objective] === true
        );
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="cardBox">
            <h1><b>Hvor langt er jeg</b></h1>

            <h3>Køretimer</h3>

            <div className="myprogressBar">
                <div
                    className="myprogressFill"
                    style={{ width: `${(progress / total) * 100}%` }}
                />
            </div>

            <p className="myprogressText">
                Du har fuldført {progress} ud af {total} køretimer
            </p>

            <h3 style={{ marginTop: 20 }}>Checkliste</h3>

            <div className="mychecklist">
                <label>
                    <span>Vigepligt</span>
                    <input
                        type="checkbox"
                        checked={hasObjective("rightOfWay")}
                        readOnly
                    />
                </label>

                <label>
                    <span>Motorvej</span>
                    <input
                        type="checkbox"
                        checked={hasObjective("highway")}
                        readOnly
                    />
                </label>

                <label>
                    <span>Natkørsel</span>
                    <input
                        type="checkbox"
                        checked={hasObjective("night")}
                        readOnly
                    />
                </label>

                <label>
                    <span>Trepunktsvending</span>
                    <input
                        type="checkbox"
                        checked={hasObjective("threePointTurn")}
                        readOnly
                    />
                </label>

                <label>
                    <span>Bak om hjørne</span>
                    <input
                        type="checkbox"
                        checked={hasObjective("reverseAroundCorner")}
                        readOnly
                    />
                </label>

                <label>
                    <span>Parallelparkering</span>
                    <input
                        type="checkbox"
                        checked={hasObjective("parallelParking")}
                        readOnly
                    />
                </label>
            </div>
        </div>
    );
}

export default MyProgressBox;