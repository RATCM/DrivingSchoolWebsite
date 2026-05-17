import "./AdminViewDrivingSchool.css";
import { useState } from "react";
import { apiRequest } from "../../../Api/apiRequest";
import DrivingSchoolModel from "../../../model/DrivingSchoolModel";
import DrivingSchoolGetDTO from "../../../DTO/DrivingSchoolGetDTO";
import GetDTOtoModel from "../../../Mappers/GetDTOtoModel";
import useDrivingSchools from "../../Functions/fetchDrivingSchools";

function AdminViewDrivingSchool() {
    const [selectedDrivingSchool, setSelectedDrivingSchool] = useState<DrivingSchoolModel | null>(null);
    const [expandedPackageIndexes, setExpandedPackageIndexes] = useState<number[]>([]);
    const [detailsLoading, setDetailsLoading] = useState(false);
    const [error, setError] = useState("");
    const {
        drivingSchools: schools,
        setDrivingSchools: setDrivingSchools,
        loading: schoolsLoading,
        error: schoolsError,
        removeSchool: removeSchool,
    } = useDrivingSchools();

    const fetchDrivingSchoolById = async (id: string) => {
        setDetailsLoading(true);
        setError("");
        setExpandedPackageIndexes([]);

        try {
            const data = await apiRequest<DrivingSchoolGetDTO>(`drivingschool/${id}`);
            const drivingSchool = GetDTOtoModel(data);
            setSelectedDrivingSchool(drivingSchool);
        } catch (err) {
            console.error(err);
            setError("Could not load driving school details.");
        } finally {
            setDetailsLoading(false);
        }
    };

    const deleteDrivingSchool = async (id: string) => {
        try {
            await apiRequest<void>(`drivingschool/${id}`, "DELETE");

            setSelectedDrivingSchool(null);
            removeSchool(id)
        } catch (err) {
            console.error(err);
            setError("Could not delete driving school.");
        }
    };

    const togglePackageDescription = (index: number) => {
        setExpandedPackageIndexes((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };

    const deletePackage = async (packageIndex: number) => {
        if (!selectedDrivingSchool) return;

        try {
            const updatedPackages = selectedDrivingSchool.Packages.filter(
                (_, index) => index !== packageIndex
            );


            const data = await apiRequest<DrivingSchoolGetDTO>(
                `drivingschool/${selectedDrivingSchool.id}`,
                "PUT",
                selectedDrivingSchool
            );

            const updatedDrivingSchool = GetDTOtoModel(data);

            setSelectedDrivingSchool(updatedDrivingSchool);

            setDrivingSchools((prev) =>
                prev.map((school) =>
                    school.id === updatedDrivingSchool.id
                        ? updatedDrivingSchool
                        : school
                )
            );

            setExpandedPackageIndexes([]);
        } catch (err) {
            console.error(err);
            setError("Could not delete package.");
        }
    };

    if (schoolsLoading) {
        return <p>Loading driving schools...</p>;
    }
    if (schoolsError) {
        return <p>{schoolsError}</p>;
    }

    return (
        <div className="cardBox">
            <h2>Køreskoler</h2>

            {error && <p>{error}</p>}

            {!selectedDrivingSchool && (
                <>
                    <div className="DrivingSchoolHeader">
                        <span>ID</span>
                        <span>Navn</span>
                        <span>Hjemmeside link</span>
                        <span>TelefonNummer</span>
                    </div>

                    {schools.map((school) => (
                        <button
                            className="DrivingSchoolRow DrivingSchoolRowButton"
                            key={school.id}
                            onClick={() => fetchDrivingSchoolById(school.id)}
                            type="button"
                        >
                            <span>{school.id}</span>
                            <span>{school.Name}</span>
                            <span>{school.WebAddress}</span>
                            <span>{school.PhoneNumber}</span>
                        </button>
                    ))}
                </>
            )}

            {detailsLoading && <p>Loading driving school details...</p>}

            {selectedDrivingSchool && !detailsLoading && (
                <div className="DrivingSchoolDetails">
                    <button
                        className="backButton"
                        onClick={() => setSelectedDrivingSchool(null)}
                        type="button"
                    >
                        Tilbage til Overblikket
                    </button>

                    <h3>{selectedDrivingSchool.Name}</h3>

                    <p>
                        <strong>Adresse:</strong>{" "}
                        {selectedDrivingSchool.StreetAddress?.AddressLine},{" "}
                        {selectedDrivingSchool.StreetAddress?.PostalCode}{" "}
                        {selectedDrivingSchool.StreetAddress?.City}
                    </p>

                    <h4>
                        <strong>Pakker</strong>
                    </h4>

                    {selectedDrivingSchool.Packages?.map((pack, index) => (
                        <div className="PackageBox" key={index}>
                            <div className="PackageRow">
                                <span>Title: {pack.Title}</span>
                                <span>Pricing: {pack.Price?.Amount}</span>

                                <button
                                    className="expandButton"
                                    onClick={() => togglePackageDescription(index)}
                                    type="button"
                                >
                                    {expandedPackageIndexes.includes(index)
                                        ? "Hide"
                                        : "Expand"}
                                </button>

                                <button
                                    className="deletePackageButton"
                                    onClick={() => deletePackage(index)}
                                    type="button"
                                >
                                    Delete
                                </button>
                            </div>

                            {expandedPackageIndexes.includes(index) && (
                                <p className="PackageDescription">
                                    {pack.Description}
                                </p>
                            )}
                        </div>
                    ))}

                    <button
                        className="deleteButton"
                        onClick={() => deleteDrivingSchool(selectedDrivingSchool.id)}
                        type="button"
                    >
                        Slet køreskole
                    </button>
                </div>
            )}
        </div>
    );
}

export default AdminViewDrivingSchool;