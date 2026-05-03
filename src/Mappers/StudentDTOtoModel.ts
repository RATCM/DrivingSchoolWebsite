import StudentDTO from "../DTO/StudentDTO";
import Student from "../model/Student";
import {mapDrivingLessonDTOToModel} from "./DrivingLessonMapper"
import StudentNameDTOtoModel from "./StudentNameDTOtoModel";

export default function StudentDTOtoModel(dto: StudentDTO): Student {
    return new Student(
        dto.id,
        dto.schoolId,
        StudentNameDTOtoModel(dto.studentName),
        dto.emailAddress,
        dto.phoneNumber,
        dto.drivingLessons?.map((lessonDto) => mapDrivingLessonDTOToModel(lessonDto)) ?? [],
        dto.theoryLessons
    );
}

export function StudentDTOArrayToModel(dtos: StudentDTO[]): Student[] {
    return dtos.map((dto) => StudentDTOtoModel(dto));
}
