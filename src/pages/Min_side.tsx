import React, { useState } from "react";
import NavigationBox from "../components/Min_side/NavigationBox";
import "./Min_side.css";
import MyDrivingSchoolBox from "../components/Min_side/skrivebord/MyDrivingSchoolBox";
import MyProgressBox from "../components/Min_side/skrivebord/MyProgressBox";
import MyAppointmentsBox from "../components/Min_side/skrivebord/MyAppointmentsBox";
import Booking from "../components/Min_side/booking/Booking";
import DrivingHistory from "../components/Min_side/drivinghistory/DrivingHistory";

function Min_Side() {
    const [active, setActive] = useState(0);

    return (
        <div className="minSideLayout">
            <div className="leftCol">
                <NavigationBox activeIndex={active} onSelect={setActive} />
            </div>

            <div className="rightCol">
                {/* SKRIVEBORD */}
                {active === 0 && (
                    <div className="dashboardLayout">

                        <div className="middleColumn">
                            <MyDrivingSchoolBox />
                            <MyProgressBox />
                        </div>

                        <div className="rightColumn">
                        <MyAppointmentsBox />
                    </div>

                    </div>
                )}

                {/* BOOK */}
                {active === 1 && (
                    <div className="dashboardLayout">
                        <div className="middleColumn">
                            <Booking/>
                        </div>
                        <div className="rightColumn">
                            <MyAppointmentsBox />
                        </div>
                    </div>
                )}

                {/* KALENDER */}
                {active === 2 && (
                    <div className="contentCard">
                        Kalender content...
                    </div>
                )}

                {/* KØRSELSHISTORIK */}
                {active === 3 && (
                    <div className="contentCard">
                        <DrivingHistory/>
                    </div>
                )}

                {/* Indstillinger */}
                {active === 4 && (
                    <div className="contentCard">
                        Indstillinger content...
                    </div>
                )}

            </div>
        </div>
    );
}

export default Min_Side;