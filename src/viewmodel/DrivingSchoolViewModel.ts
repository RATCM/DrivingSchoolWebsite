import DrivingSchoolModel from "../model/DrivingSchoolModel";
import Package from "../model/Submodels/Package";


type DrivingSchoolViewModel = {
    schoolName: string;
    phone: string;
    website: string;
    address: string;
    region: string;
    packages: string;
    pricing: string;
    passRate: string;
    avgPrice: string;
};

export function mapDrivingSchoolViewModel(model: DrivingSchoolModel): DrivingSchoolViewModel {

    return {
        schoolName: `${model.Name}`,
        phone: `${model.PhoneNumber}`,
        website: `${model.WebAddress}`,
        address: `${model.StreetAddress.AddressLine}, ${model.StreetAddress.PostalCode} ${model.StreetAddress.City}`,
        region: `${model.StreetAddress.Region}`,
        packages: ``,
        pricing: `1000`,
        passRate: `100`,
        avgPrice: `1000`
    }
}
export default DrivingSchoolViewModel;