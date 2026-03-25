import lessonModel from "../model/LessonModel";
import drivingLessonModel from "../model/DrivingLessonModel";
import theoryLessonModel from "../model/TheoryLessonModel";
//TODO: accommodate for subtypes
type LessonViewModel = {
    instructor: string,
    instructorSignature: string,
    price: string,
    drivingSchool: string,
};

export function mapLessonViewModel(model: lessonModel): LessonViewModel {
    return {
        instructor: `${model.instructor.name}`,
        instructorSignature: `${model.instructorSignature}`,
        price: `${model.price}`,
        drivingSchool: `${model.drivingSchool.schoolName}`,
    }
}