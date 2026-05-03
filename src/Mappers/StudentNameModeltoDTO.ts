import StudentNameDTO from "../DTO/StudentNameDTO";
import NameModel from "../model/Submodels/NameModel";

export default function StudentNameModeltoDTO(model: NameModel): StudentNameDTO {
    return {
        firstName: model.FirstName,
           lastName: model.LastName
    }

}