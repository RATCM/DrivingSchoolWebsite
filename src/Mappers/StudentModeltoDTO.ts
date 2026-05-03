// src/Mappers/StudentModelToDTO.ts

import StudentDTO from "../DTO/StudentDTO";
import Student from "../model/Student";
import NameModelToStudentNameDTO from "./StudentNameModeltoDTO";

export default function StudentModelToDTO(model: Student): StudentDTO {
    return {
        id: model.id,
        studentName: NameModelToStudentNameDTO(model.name),
        emailAddress: model.emailAddress,
        phoneNumber: model.phoneNumber,
        schoolId: model.schoolId,
        theoryLessons: model.theoryLessons,
        drivingLessons: model.drivingLessons
    };
}