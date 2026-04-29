import StreetsAddressModel from "./Submodels/StreetsAddressModel";

class DrivingSchoolModel {
    schoolName: string;
    phone: string;
    website: string;
    streetAddress: StreetsAddressModel;
    pricing: number;

    constructor(
        schoolName: string,
        phone: string,
        website: string,
        streetAddress: StreetsAddressModel,
        pricing: number,
    ) {
        this.schoolName = schoolName;
        this.phone = phone;
        this.website = website;
        this.streetAddress = streetAddress;
        this.pricing = pricing;
    }
}
export default DrivingSchoolModel;