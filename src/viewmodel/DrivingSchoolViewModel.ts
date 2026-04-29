import DrivingSchoolModel from "../model/DrivingSchoolModel";
type DrivingSchoolViewModel = {
    schoolName: string;
    phone: string;
    website: string;
    address: string;
    region: string;
    pricing: string;
};

export function mapDrivingSchoolViewModel(model: DrivingSchoolModel): DrivingSchoolViewModel {
    return {
        schoolName: `${model.schoolName}`,
        phone: `${model.phone}`,
        website: `${model.website}`,
        address: `${model.streetAddress.address}`+ `, ` + `${model.streetAddress.postalCode}` + ` ` + `${model.streetAddress.city}`,
        region: `${model.streetAddress.region}`,
        pricing: `${model.pricing}`,
    }
}
export default DrivingSchoolViewModel;