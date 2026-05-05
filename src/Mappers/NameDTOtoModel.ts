import NameDTO from "../DTO/NameDTO";
import NameModel from "../model/Submodels/NameModel";

export default function NameDTOtoModel(dto: NameDTO): NameModel {
    return new NameModel(
        dto.FirstName,
        dto.LastName
    );
}