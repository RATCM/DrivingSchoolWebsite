// src/components/Functions/useDrivingSchools.ts

import { useEffect, useState } from "react";
import { apiRequest } from "../../Api/apiRequest";
import DrivingSchoolModel from "../../model/DrivingSchoolModel";
import DrivingSchoolGetDTO from "../../DTO/DrivingSchoolGetDTO";
import GetDTOtoModel, {DrivingSchoolDTOArrayToModel} from "../../Mappers/GetDTOtoModel";

export default function useDrivingSchools() {
    const [drivingSchools, setDrivingSchools] = useState<DrivingSchoolModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchDrivingSchools = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await apiRequest<DrivingSchoolGetDTO[]>("drivingschool");

            setDrivingSchools(DrivingSchoolDTOArrayToModel(data));
        } catch (err) {
            console.error(err);
            setError("Could not load driving schools.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDrivingSchools();
    }, []);

    return {
        drivingSchools,
        setDrivingSchools,
        fetchDrivingSchools,
        loading,
        error
    };
}