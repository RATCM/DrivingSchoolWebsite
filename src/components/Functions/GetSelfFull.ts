import { useEffect, useState } from "react";
import {apiRequest} from "../../Api/apiRequest";

function GetSelfFull<T>() {
    const [self, setSelf] = useState<T|null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSelf = async () => {
            try {

                const data = await apiRequest<any>('auth/self')
                setSelf(data);

            } catch (err) {
                console.error(err);
                setError("Could not load user id.");
            }
        };

        fetchSelf();
    }, []);

    return { self, error };
}

export default GetSelfFull;