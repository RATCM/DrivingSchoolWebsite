import React, { useState } from "react";
import NavigationBox from "../components/MinSide/NavigationBox";
import "./MinSide.css";
import MyDrivingSchoolBox from "../components/MinSide/skrivebord/MyDrivingSchoolBox";
import MyProgressBox from "../components/MinSide/skrivebord/MyProgressBox";
import MyAppointmentsBox from "../components/MinSide/skrivebord/MyAppointmentsBox";
import Booking from "../components/MinSide/booking/Booking";
import DrivingHistory from "../components/MinSide/drivinghistory/DrivingHistory";
import Kalender from "../components/MinSide/kalender/Kalender";

function MinSide() {
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
                    <div className="dashboardLayout">
                        <div className="middleColumn">
                            <Kalender/>
                        </div>
                        <div className="rightColumn">
                            <MyAppointmentsBox/>
                        </div>
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

export default MinSide;