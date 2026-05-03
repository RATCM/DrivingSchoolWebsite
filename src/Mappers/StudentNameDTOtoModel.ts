import StudentNameDTO from "../DTO/StudentNameDTO";
import NameModel from "../model/Submodels/NameModel";

export default function StudentNameDTOtoModel(dto: StudentNameDTO): NameModel {
    return new NameModel(
        dto.firstName,
        dto.lastName
    );
}