
import StreetsAddressModel from "../model/Submodels/StreetsAddressModel";
import StreetAddressGetDTO from "../DTO/StreetAddressGetDTO";

export function GetStreetAddressGetDTO(streetAddress: StreetAddressGetDTO): StreetsAddressModel {
    return new StreetsAddressModel(streetAddress.addressLine, streetAddress.postalCode,streetAddress.city,streetAddress.region)
}
export default GetStreetAddressGetDTO;