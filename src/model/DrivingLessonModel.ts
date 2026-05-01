import PricingGetDTO from "../DTO/PricingGetDTO";
import DrivingObjectiveModel from "./Submodels/DrivingLesson/DrivingObjectiveModel";
import DrivingRouteModel from "./Submodels/DrivingLesson/DrivingRouteModel";

class DrivingLessonModel {
    id: string;
    schoolId: string;
    instructorId: string;
    studentId: string;
    route: DrivingRouteModel;
    price: PricingGetDTO;
    completedObjectives: DrivingObjectiveModel;

    constructor(
        id: string,
        schoolId: string,
        instructorId: string,
        studentId: string,
        route: DrivingRouteModel,
        price: PricingGetDTO,
        completedObjectives: DrivingObjectiveModel
    ) {
        this.id = id;
        this.schoolId = schoolId;
        this.instructorId = instructorId;
        this.studentId = studentId;
        this.route = route;
        this.price = price;
        this.completedObjectives = completedObjectives;
    }
}

export default DrivingLessonModel;