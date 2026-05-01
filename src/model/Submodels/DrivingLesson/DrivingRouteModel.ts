import DateTimeRangeModel from "./DateTimeRangeModel";
import CoordinatePointModel from "./CoordinatePointModel";

class DrivingRouteModel {
    dateTimeRange: DateTimeRangeModel;
    routeCoordinates: CoordinatePointModel[];

    constructor(
        dateTimeRange: DateTimeRangeModel,
        routeCoordinates: CoordinatePointModel[]
    ) {
        this.dateTimeRange = dateTimeRange;
        this.routeCoordinates = routeCoordinates;
    }
}

export default DrivingRouteModel;