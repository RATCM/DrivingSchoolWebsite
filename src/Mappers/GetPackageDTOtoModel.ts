import PricingGetDTO from "../DTO/PricingGetDTO";
import Pricing from "../model/Submodels/Pricing";
import Package from "../model/Submodels/Package";
import PackageGetDTO from "../DTO/PackageGetDTO";
import GetPricingDTOtoModel from "./GetPricingDTOtoModel";

export function GetPackageDTOtoModel(packageDTO: PackageGetDTO): Package {
    return new Package(packageDTO.title, packageDTO.description, GetPricingDTOtoModel(packageDTO.price));
}
export default GetPackageDTOtoModel;