import DrivingSchoolModel from "../model/DrivingSchoolModel";


type DrivingSchoolViewModel = {
    schoolName: string;
    phone: string;
    website: string;
    addressLine: string;
    addressCity: string;
    region: string;
    packages: string;
    pricing: string;
    passRate: string;
    avgPrice: string;
};

export function mapDrivingSchoolViewModel(model: DrivingSchoolModel, passRate?: string ,avgPrice?: string): DrivingSchoolViewModel {

    const sortedPackages = model.Packages.sort((a,b) =>
        a.Price.Amount - b.Price.Amount)
    const cheapestPackage = sortedPackages.at(0);
    function cheapestPackageString() {
        if (cheapestPackage) {
            return `${cheapestPackage.Title} -- ${cheapestPackage.Price.Amount.toFixed(2)}`;
        }
        return `Ingen pakker`;
    }
    function cheapestPackagePricing() {
        if (cheapestPackage) {
            return `${cheapestPackage.Price.Amount.toFixed(2)}`;
        }
        return `30000`;
    }

    return {
        schoolName: `${model.Name}`,
        phone: `${model.PhoneNumber}`,
        website: `${model.WebAddress}`,
        addressLine: `${model.StreetAddress.AddressLine}`,
        addressCity: `${model.StreetAddress.PostalCode} ${model.StreetAddress.City}`,
        region: `${model.StreetAddress.Region}`,
        packages: cheapestPackageString(),
        pricing: cheapestPackagePricing(),
        passRate: passRate ? passRate: `-1`,
        avgPrice: avgPrice ? avgPrice: `-1`
    }
}
export default DrivingSchoolViewModel;