import DrivingSchoolGetDTO from "../DTO/DrivingSchoolGetDTO";
import DrivingSchoolModel from "../model/DrivingSchoolModel";
import getPackageDTOtoModel from "./GetPackageDTOtoModel";
import GetStreetAddressGetDTO from "./GetStreetAddressGetDTO";

function GetDTOtoModel(DTO: DrivingSchoolGetDTO): DrivingSchoolModel {
    return new DrivingSchoolModel(
        DTO.id,
        DTO.name,
        DTO.phoneNumber,
        DTO.webAddress,
        GetStreetAddressGetDTO(DTO.streetAddress),
        DTO.packages.map((packag) => getPackageDTOtoModel(packag))
    );
}
export default GetDTOtoModel;