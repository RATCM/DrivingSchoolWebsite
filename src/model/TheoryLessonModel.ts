import Pricing from "./Submodels/Pricing";

class TheoryLessonModel {
    id: string;
    schoolId: string;
    instructorId?: string;
    lessonDateTime: Date;
    price: Pricing;
    studentId?: string;

    constructor(
        id: string,
        schoolId: string,
        instructorId: string | undefined,
        lessonDateTime: Date,
        price: Pricing,
        studentId: string | undefined
    ) {
        this.id = id;
        this.schoolId = schoolId;
        this.instructorId = instructorId;
        this.lessonDateTime = lessonDateTime;
        this.price = price;
        this.studentId = studentId;
    }
}

export default TheoryLessonModel;