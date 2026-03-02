import LessonModel from "./LessonModel";
import InstructorModel from "./InstructorModel";
import drivingSchoolModel from "./DrivingSchoolModel";
import StudentModel from "./StudentModel";

class TheoryLessonModel extends LessonModel{
    date: number;
    students: StudentModel[];

    constructor(
        instructor : InstructorModel,
        instructorSignature: string,
        drivingSchool : drivingSchoolModel,
        price: number,
        date : number,
        students: StudentModel[],
    ) {
        super(
            instructor,
            instructorSignature,
            drivingSchool,
            price
        );
        this.date = date;
        this.students = students;
    }
}
export default TheoryLessonModel;