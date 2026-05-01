import { useEffect, useState } from "react";
import {apiRequest} from "../../Api/apiRequest";

function GetMyDrivingSchool() {
    const [id, setId] = useState<string | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSelf = async () => {
            try {

                const data = await apiRequest<any>('auth/self')
                setId(data.schoolId);

            } catch (err) {
                console.error(err);
                setError("Could not load school id.");
            }
        };

        fetchSelf();
    }, []);

    return { id, error };
}

export default GetMyDrivingSchool;