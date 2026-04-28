import React, { useMemo, useState } from "react";
import NavigationBox, { NavigationItem } from "../components/MinSide/NavigationBox";
import "./MinSide.css";
import MyDrivingSchoolBox from "../components/MinSide/skrivebord/MyDrivingSchoolBox";
import MyProgressBox from "../components/MinSide/skrivebord/MyProgressBox";
import MyAppointmentsBox, { MyFilteredAppointmentsBox } from "../components/MinSide/skrivebord/MyAppointmentsBox";
import Booking from "../components/MinSide/booking/Booking";
import DrivingHistory from "../components/MinSide/drivinghistory/DrivingHistory";
import Kalender from "../components/MinSide/kalender/Kalender";
import AdminInstructorView from "../components/MinSide/AdminInstructorView/AdminInstructorView";
import AdminStudentView from "../components/MinSide/AdminStudentView/AdminStudentView";

type Role = "student" | "instructor" | "admin";

function getCookie(name: string): string | null {
    const value = document.cookie
        .split("; ")
        .find((row) => row.startsWith(name + "="));

    return value ? decodeURIComponent(value.split("=")[1]) : null;
}

const allItems: NavigationItem[] = [
    { id: "dashboard", label: "Skrivebord" },
    { id: "booking", label: "Book en køretime" },
    { id: "calendar", label: "Kalender" },
    { id: "history", label: "Kørselshistorik" },
    { id: "settings", label: "Indstillinger" },
    { id: "adminStudents", label: "Studerende" },
    { id: "adminInstructors", label: "Instruktørere" },
];

function MinSide() {
    const role = (getCookie("role") ?? "student") as Role;

    const items = useMemo(() => {
        if (role === "admin") {
            return allItems.filter(
                (item) =>
                    item.id === "adminStudents" ||
                    item.id === "adminInstructors"
            );
        }

        if (role === "instructor") {
            return allItems.filter(
                (item) => item.id !== "adminInstructors"
            );
        }

        return allItems.filter(
            (item) =>
                item.id !== "adminStudents" &&
                item.id !== "adminInstructors"
        );
    }, [role]);

    const [active, setActive] = useState(items[0].id);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    return (
        <div className="minSideLayout">
            <div className="leftCol">
                <NavigationBox
                    activeId={active}
                    onSelect={setActive}
                    items={items}
                />
            </div>

            <div className="rightCol">
                {active === "dashboard" && (
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

                {active === "booking" && (
                    <div className="dashboardLayout">
                        <div className="middleColumn">
                            <Booking />
                        </div>
                        <div className="rightColumn">
                            <MyAppointmentsBox />
                        </div>
                    </div>
                )}

                {active === "calendar" && (
                    <div className="dashboardLayout">
                        <div className="middleColumn">
                            <Kalender selectedDate={selectedDate} onSelectDate={setSelectedDate} />
                        </div>
                        <div className="rightColumn">
                            {selectedDate && <MyFilteredAppointmentsBox Date={selectedDate} />}
                        </div>
                    </div>
                )}

                {active === "history" && (
                    <div className="contentCard">
                        <DrivingHistory />
                    </div>
                )}

                {active === "settings" && (
                    <div className="contentCard">
                        Indstillinger content...
                    </div>
                )}

                {active === "adminInstructors" && (
                    <div className="contentCard">
                        <AdminInstructorView />
                    </div>
                )}

                {active === "adminStudents" && (
                    <div className="contentCard">
                        <AdminStudentView />
                    </div>
                )}
            </div>
        </div>
    );
}

export default MinSide;