import StreetsAddressModel from "./Submodels/StreetsAddressModel";
import Package from "./Submodels/Package";

class DrivingSchoolModel {
    id: string;
    Name: string;
    PhoneNumber: string;
    WebAddress: string;
    StreetAddress: StreetsAddressModel;
    Packages: Package[]

    constructor(
        id: string,
        schoolName: string,
        phone: string,
        website: string,
        streetAddress: StreetsAddressModel,
        packages: Package[],
    ) {
        this.id = id;
        this.Name = schoolName;
        this.PhoneNumber = phone;
        this.WebAddress = website;
        this.StreetAddress = streetAddress;
        this.Packages = packages;
    }
}
export default DrivingSchoolModel;