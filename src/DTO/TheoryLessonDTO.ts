import PricingGetDTO from "./PricingGetDTO";

type TheoryLessonDTO = {
    id: string,
    schoolId: string,
    instructorId?: string,
    lessonDateTime: string,
    price: PricingGetDTO,
    studentId?: string
}
export default TheoryLessonDTO;
