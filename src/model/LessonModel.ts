import InstructorModel from './InstructorModel';
import drivingSchoolModel from "./DrivingSchoolModel";

abstract class LessonModel {
    instructor: InstructorModel;
    instructorSignature: string;
    drivingSchool: drivingSchoolModel;
    price: number;

    protected constructor(
        instructor: InstructorModel,
        instructorSignature: string, //boolean instead?
        drivingSchool: drivingSchoolModel,
        price: number,
    ) {
        this.instructor = instructor;
        this.instructorSignature = instructorSignature;
        this.drivingSchool = drivingSchool;
        this.price = price;
    }
}
export default LessonModel;