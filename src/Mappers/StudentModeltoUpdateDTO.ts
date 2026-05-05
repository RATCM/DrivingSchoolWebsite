// src/Mappers/StudentModelToDTO.ts

import NameModeltoNameDTO from "./NameModeltoDTO";
import Student from "../model/Student";
import StudentUpdateDTO from "../DTO/StudentUpdateDTO";

export default function StudentModeltoUpdateDTO(model: Student): StudentUpdateDTO{
    return {
        Name: NameModeltoNameDTO(model.name),
        Email: model.emailAddress,
        PhoneNumber: model.phoneNumber
    };
}