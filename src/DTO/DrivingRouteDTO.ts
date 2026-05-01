import DateTimeRangeDTO from "./DateTimeRangeDTO";
import CoordinatePointDTO from "./CoordinatePointDTO";

type DrivingRouteDTO = {
    dateTimeRange: DateTimeRangeDTO
    routeCoordinates: CoordinatePointDTO[]
}
export default DrivingRouteDTO;