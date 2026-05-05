import DrivingSchoolGetDTO from "../DTO/DrivingSchoolGetDTO";
import DrivingSchoolModel from "../model/DrivingSchoolModel";
import getPackageDTOtoModel from "./GetPackageDTOtoModel";
import GetStreetAddressGetDTO from "./GetStreetAddressGetDTO";
import InstructorDTO from "../DTO/InstructorDTO";
import Instructor from "../model/Instructor";
import InstructorDTOtoModel from "./InstructorDTOtoModel";

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
export function DrivingSchoolDTOArrayToModel(dtos: DrivingSchoolGetDTO[]): DrivingSchoolModel[] {
    return dtos.map((dto) => GetDTOtoModel(dto));
}
export default GetDTOtoModel;