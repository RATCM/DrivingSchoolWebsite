import React, {useState } from "react";
import "./AdminCreateDrivingSchool.css";
import {apiRequest} from "../../../Api/apiRequest";
import DrivingSchoolModel from "../../../model/DrivingSchoolModel";
import StreetsAddressModel from "../../../model/Submodels/StreetsAddressModel";
import Package from "../../../model/Submodels/Package";
import Pricing from "../../../model/Submodels/Pricing";



function AdminCreateDrivingSchool() {
    const [Name, setName] = useState("");
    const [Address, setAddress] = useState("");
    const [PostalCode, setPostalCode] = useState("");
    const [City, setCity] = useState("");
    const [Region, setRegion] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [WebAddress, setWebAddress] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [packages, setPackages] = useState<Package[]>([
        new Package("", "", new Pricing(0,"DKK"))
    ]);


    const handleCreateDrivingschool = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const streetsAddress = new StreetsAddressModel(Address, PostalCode, City, Region);
            const drivingSchool = new DrivingSchoolModel("",Name,phoneNumber,WebAddress,streetsAddress,packages)
            await apiRequest<void>('drivingschool', 'POST', drivingSchool);

            setMessage("Driving school created successfully.");

            setName("");
            setAddress("");
            setCity("");
            setRegion("");
            setPhoneNumber("");
            setPostalCode("");
            setWebAddress("");
            setPackages([
                new Package("", "", new Pricing(0,"DKK"))
            ])
        } catch (err) {
            setError("Failed to create Driving School.");
        }
    };
    const handlePackageChange = (
        index: number,
        field: "title" | "price" | "description",
        value: string
    ) => {
        const updatedPackages = [...packages];
        const currentPackage = updatedPackages[index];

        updatedPackages[index] = new Package(
            field === "title" ? value : currentPackage.Title,
            field === "description" ? value : currentPackage.Description,
            field === "price"
                ? new Pricing(Number(value), currentPackage.Price.Currency)
                : currentPackage.Price
        );

        setPackages(updatedPackages);
    };

    const addPackageLine = () => {
        setPackages([...packages, new Package("", "", new Pricing(0,"DKK"))]);
    };

    const removePackageLine = (index: number) => {
        setPackages(packages.filter((_, i) => i !== index));
    };
    return (
        <div className="create-school-page">
            <div className="admin-form-card">
                <h1>Create Driving School</h1>

                <form onSubmit={handleCreateDrivingschool} className="admin-form">
                    <label>
                        Navn
                        <input
                            type="text"
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Adresse
                        <input
                            type="text"
                            value={Address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Postnummer
                        <input
                            type="text"
                            value={PostalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        By
                        <input
                            type="text"
                            value={City}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Region
                        <input
                        type="text"
                        value={Region}
                        onChange={(e) => setRegion(e.target.value)}
                        required
                        />
                    </label>
                    <label>
                        Telefonnummer
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Hjemmeside
                        <input
                            type="WebAddress"
                            value={WebAddress}
                            onChange={(e) => setWebAddress(e.target.value)}
                            required
                        />
                    </label>

                    {message && <p className="success-message">{message}</p>}
                    {error && <p className="error-message">{error}</p>}


                    <div className="packages-section">
                        <h2>Pakker</h2>

                        {packages.map((pkg, index) => (
                            <div className="package-row" key={index}>
                                <input
                                    type="text"
                                    placeholder="Pakke titel"
                                    value={pkg.Title}
                                    onChange={(e) =>
                                        handlePackageChange(index, "title", e.target.value)
                                    }
                                    required
                                />

                                <input
                                    type="text"
                                    placeholder="Beskrivelse"
                                    value={pkg.Description}
                                    onChange={(e) =>
                                        handlePackageChange(index, "description", e.target.value)
                                    }
                                    required
                                />

                                <input
                                    type="number"
                                    placeholder="Pris"
                                    value={pkg.Price.Amount}
                                    onChange={(e) =>
                                        handlePackageChange(index, "price", e.target.value)
                                    }
                                    required
                                />

                                {packages.length > 1 && (
                                    <button
                                        type="button"
                                        className="remove-package-button"
                                        onClick={() => removePackageLine(index)}
                                    >
                                        -
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            className="add-package-button"
                            onClick={addPackageLine}
                        >
                            +
                        </button>
                    </div>
                    <button type="submit">Create Drivingschool</button>
                </form>
            </div>
        </div>
    );
}

export default AdminCreateDrivingSchool;