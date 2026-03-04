import React, { useState } from "react";
import NavigationBox from "../components/Min_side/NavigationBox";
import "./Min_side.css";

function Min_Side() {
    const [active, setActive] = useState(0);

    return (
        <div className="minSideLayout">
            <div className="leftCol">
                <NavigationBox activeIndex={active} onSelect={setActive} />
            </div>

            <div className="rightCol">
                <div style={{ background: "white", borderRadius: 28, padding: 24 }}>
                    Right side content...
                </div>
            </div>
        </div>
    );
}

export default Min_Side;