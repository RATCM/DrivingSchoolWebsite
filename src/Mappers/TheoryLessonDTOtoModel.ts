import TheoryLessonDTO from "../DTO/TheoryLessonDTO";
import TheoryLessonModel from "../model/TheoryLessonModel";
import getPricingDTOtoModel from "./GetPricingDTOtoModel";

function TheoryLessonDTOtoModel(dto: TheoryLessonDTO): TheoryLessonModel {
    return new TheoryLessonModel(
        dto.id,
        dto.schoolId,
        dto.instructorId,
        new Date(dto.lessonDateTime),
        getPricingDTOtoModel(dto.price),
        dto.studentId
    );
}
export function mapTheoryLessonDTOsToModels(dtos: TheoryLessonDTO[]): TheoryLessonModel[] {
    return dtos.map(TheoryLessonDTOtoModel);
}
export default TheoryLessonDTOtoModel;