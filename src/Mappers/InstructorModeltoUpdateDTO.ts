// src/Mappers/StudentModelToDTO.ts

import NameModeltoNameDTO from "./NameModeltoDTO";
import Instructor from "../model/Instructor";
import InstructorUpdateDTO from "../DTO/InstructorUpdateDTO";

export default function InstructorModeltoUpdateDTO(model: Instructor): InstructorUpdateDTO {
    return {
        Name: NameModeltoNameDTO(model.name),
        Email: model.emailAddress,
        PhoneNumber: model.phoneNumber
    };
}