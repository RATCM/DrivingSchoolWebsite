import PricingGetDTO from "./PricingGetDTO";
import DrivingObjectiveDTO from "./DrivingObjectiveDTO";
import DrivingRouteDTO from "./DrivingRouteDTO";

type DrivingLessonDTO = {
    id: string;
    schoolId: string;
    instructorId: string;
    studentId: string;
    route: DrivingRouteDTO;
    price: PricingGetDTO;
    completedObjectives: DrivingObjectiveDTO
};
export default DrivingLessonDTO;