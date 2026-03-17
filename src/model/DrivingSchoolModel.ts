class DrivingSchoolModel {
    schoolName: string;
    phone: string;
    website: string;
    address: string;
    region: string;
    pricing: number;

    constructor(
        schoolName: string,
        phone: string,
        website: string,
        address: string,
        region: string,
        pricing: number,
    ) {
        this.schoolName = schoolName;
        this.phone = phone;
        this.website = website;
        this.address = address;
        this.region = region;
        this.pricing = pricing;
    }
}
export default DrivingSchoolModel;