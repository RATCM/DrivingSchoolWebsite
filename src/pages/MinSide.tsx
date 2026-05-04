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
import InstructorStudentView from "../components/MinSide/InstructorStudentView/InstructorStudentView";
import CreateNewInstructor from "../components/MinSide/CreateNewInstructor/CreateNewInstructor";
import AdminCreateDrivingSchool from "../components/MinSide/AdminCreateDrivingSchool/AdminCreateDrivingSchool";
import AdminViewDrivingSchool from "../components/MinSide/AdminUpdateDrivingSchool/AdminViewDrivingSchool";
import InviteStudents from "../components/MinSide/InviteStudents/InviteStudents";
import StudentInfoView from "../components/MinSide/StudentInfoView/StudentInfoView";
import InstructorInfoView from "../components/MinSide/InstructorInfoView/InstructorInfoView";

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
    { id: "adminStudents", label: "Elever" },
    { id: "adminInstructors", label: "Instruktørere" },
    { id: "instructorStudents", label: "Elever" },
    { id: "CreateInstructor", label: "Ny Instruktør"},
    { id: "CreateDrivingSchool", label: "Ny Køreskole"},
    { id: "ViewDrivingSchool", label: "Køreskoler"},
    { id: "instructorGenerateInvite", label: "Invitation af elever"},
    { id: "settings", label: "Indstillinger" },
];

function MinSide() {
    const role = (getCookie("role") ?? "student") as Role;

    const items = useMemo(() => {
        if (role === "admin") {
            return allItems.filter(
                (item) =>
                    item.id === "adminStudents" ||
                    item.id === "adminInstructors" ||
                    item.id === "CreateInstructor" ||
                    item.id === "CreateDrivingSchool" ||
                    item.id === "ViewDrivingSchool"
            );
        } else if (role === "instructor") {
            return allItems.filter(
                (item) =>
                    item.id !== "adminInstructors" &&
                    item.id !== "adminStudents" &&
                    item.id !== "CreateInstructor" &&
                    item.id !== "CreateDrivingSchool" &&
                    item.id !== "ViewDrivingSchool"
            );
        } else {
            return allItems.filter(
                (item) =>
                    item.id !== "adminStudents" &&
                    item.id !== "adminInstructors" &&
                    item.id !== "instructorStudents" &&
                    item.id !== "CreateInstructor" &&
                    item.id !== "CreateDrivingSchool" &&
                    item.id !== "ViewDrivingSchool" &&
                    item.id !== "instructorGenerateInvite"
            );
        }
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
                        if role === "student"{
                        <StudentInfoView/>
                    } else if role === "instructor"{
                        <InstructorInfoView/>}
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
                {active === "instructorStudents" && (
                    <div className="contentCard">
                        <InstructorStudentView/>
                    </div>
                )}
                {active === "CreateInstructor" && (
                    <div className="contentCard">
                        <CreateNewInstructor/>
                    </div>
                )}
                {active === "CreateDrivingSchool" && (
                    <div className="contentCard">
                        <AdminCreateDrivingSchool/>
                    </div>
                )}
                {active === "ViewDrivingSchool" && (
                    <div className="contentCard">
                        <AdminViewDrivingSchool/>
                    </div>
                )}
                {active === "instructorGenerateInvite" && (
                    <div className="contentCard">
                        <InviteStudents/>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MinSide;