import LessonModel from "./LessonModel";
import InstructorModel from "./InstructorModel";
import drivingSchoolModel from "./DrivingSchoolModel";
import StudentModel from "./StudentModel";

class DrivingLessonModel extends LessonModel{
    student: StudentModel;
    studentSignature: string;
    startTime: string;
    endTime: string;
    route: number[];

    constructor(
        instructor : InstructorModel,
        instructorSignature: string,
        drivingSchool : drivingSchoolModel,
        price: number,
        student: StudentModel,
        studentSignature : string,
        startTime : string,
        endTime : string,
        route : number[]
    ) {
        super(instructor,
            instructorSignature,
            drivingSchool,
            price);
        this.student = student;
        this.studentSignature = studentSignature;
        this.startTime = startTime;
        this.endTime = endTime;
        this.route = route;
    }
}
export default DrivingLessonModel;