import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../Api/config";
import {apiRequest} from "../../Api/apiRequest";

function GetSelf() {
    const [id, setId] = useState<string | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSelf = async () => {
            try {

                const data = await apiRequest<any>('auth/self')
                setId(data.id);

            } catch (err) {
                console.error(err);
                setError("Could not load user id.");
            }
        };

        fetchSelf();
    }, []);

    return { id, error };
}

export default GetSelf;