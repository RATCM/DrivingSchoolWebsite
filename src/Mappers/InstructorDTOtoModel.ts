import InstructorDTO from "../DTO/InstructorDTO";
import Instructor from "../model/Instructor";
import StudentNameDTOtoModel from "./StudentNameDTOtoModel";

export default function InstructorDTOtoModel(dto: InstructorDTO): Instructor {
    return new Instructor(
        dto.id,
        dto.schoolId,
        StudentNameDTOtoModel(dto.name),
        dto.emailAddress,
        dto.phoneNumber,
        dto.DrivingLessonIds ?? [],
        dto.TheoryLessonIds ?? []
    );
}

export function InstructorDTOArrayToModel(dtos: InstructorDTO[]): Instructor[] {
    return dtos.map((dto) => InstructorDTOtoModel(dto));
}