import NameModel from "../model/Submodels/NameModel";
import NameDTO from "../DTO/NameDTO";

export default function StudentNameModeltoDTO(model: NameModel): NameDTO {
    return {
        FirstName: model.FirstName,
        LastName: model.LastName
    }

}