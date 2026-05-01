import React, { useEffect, useState } from "react";
import "./MyDrivingSchoolBox.css";
import InstructorModel from "../../../model/InstructorModel";
import { mapUserViewModel } from "../../../viewmodel/UserViewModel";
import DrivingSchoolModel from "../../../model/DrivingSchoolModel";
import { apiRequest } from "../../../Api/apiRequest";

import GetMyDrivingSchool from "../../Functions/GetMyDrivingSchool";
import DrivingSchoolGetDTO from "../../../DTO/DrivingSchoolGetDTO";
import GetDTOtoModel from "../../../Mappers/GetDTOtoModel";

function MyDrivingSchoolBox() {
    const { id: myId, error: selfError } = GetMyDrivingSchool();
    const [drivingSchool, setDrivingSchool] = useState<DrivingSchoolModel | null>(null);
    const [error, setError] = useState("");

    const drivingInstructor = new InstructorModel(
        "albert",
        "albert@dtu.dk",
        "fghjkjhghjklhgfghj",
        "+45 11 22 33 44",
        null
    );

    const vm = mapUserViewModel(drivingInstructor);

    useEffect(() => {
        if (selfError) {
            setError(selfError);
            return;
        }
        const myid = myId;
        const fetchDrivingSchool = async () => {
            try {
                const data = await apiRequest<DrivingSchoolGetDTO>(`drivingschool/${myId}`);
                setDrivingSchool(GetDTOtoModel(data));
            } catch (err) {
                console.error(err);
                setError("Could not load driving school.");
            }
        };

        if (myid) {
            fetchDrivingSchool();
        }
    }, [myId]);

    return (
        <div className="cardBox">
            <h2>Kontakt</h2>

            <p><b>Køreskole kontakt info</b></p>

            {error && <p>{error}</p>}

            <p>Tlf: {drivingSchool?.PhoneNumber ?? "Loading..."}</p>
            <p>Link til Hjemmeside: {drivingSchool?.WebAddress ?? "Loading..."}</p>
        </div>
    );
}

export default MyDrivingSchoolBox;