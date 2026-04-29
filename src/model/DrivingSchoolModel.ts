import StreetsAddressModel from "./Submodels/StreetsAddressModel";
import Package from "./Submodels/Package";

class DrivingSchoolModel {
    schoolName: string;
    phone: string;
    website: string;
    streetAddress: StreetsAddressModel;
    packages: Package[]

    constructor(
        schoolName: string,
        phone: string,
        website: string,
        streetAddress: StreetsAddressModel,
        packages: Package[],
    ) {
        this.schoolName = schoolName;
        this.phone = phone;
        this.website = website;
        this.streetAddress = streetAddress;
        this.packages = packages;
    }
}
export default DrivingSchoolModel;