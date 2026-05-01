import DrivingLessonDTO from "../DTO/DrivingLessonDTO";
import DrivingLessonModel from "../model/DrivingLessonModel";

import DrivingRouteDTO from "../DTO/DrivingRouteDTO";
import DrivingRouteModel from "../model/Submodels/DrivingLesson/DrivingRouteModel";

import DateTimeRangeDTO from "../DTO/DateTimeRangeDTO";
import DateTimeRangeModel from "../model/Submodels/DrivingLesson/DateTimeRangeModel";

import CoordinatePointDTO from "../DTO/CoordinatePointDTO";
import CoordinatePointModel from "../model/Submodels/DrivingLesson/CoordinatePointModel";

import DrivingObjectiveDTO from "../DTO/DrivingObjectiveDTO";
import DrivingObjectiveModel from "../model/Submodels/DrivingLesson/DrivingObjectiveModel";

export function mapDateTimeRangeDTOToModel(dto: DateTimeRangeDTO): DateTimeRangeModel {
    return new DateTimeRangeModel(
        new Date(dto.startDateTime),
        new Date(dto.endDateTime)
    );
}

export function mapCoordinatePointDTOToModel(dto: CoordinatePointDTO): CoordinatePointModel {
    return new CoordinatePointModel(
        dto.order,
        dto.latitude,
        dto.longitude
    );
}

export function mapDrivingObjectiveDTOToModel(dto: DrivingObjectiveDTO): DrivingObjectiveModel {
    return new DrivingObjectiveModel(
        dto.rightOfWay,
        dto.highway,
        dto.night,
        dto.threePointTurn,
        dto.reverseAroundCorner,
        dto.parallelParking
    );
}

export function mapDrivingRouteDTOToModel(dto: DrivingRouteDTO): DrivingRouteModel {
    return new DrivingRouteModel(
        mapDateTimeRangeDTOToModel(dto.dateTimeRange),
        dto.routeCoordinates.map(mapCoordinatePointDTOToModel)
    );
}

export function mapDrivingLessonDTOToModel(dto: DrivingLessonDTO): DrivingLessonModel {
    return new DrivingLessonModel(
        dto.id,
        dto.schoolId,
        dto.instructorId,
        dto.studentId,
        mapDrivingRouteDTOToModel(dto.route),
        dto.price,
        mapDrivingObjectiveDTOToModel(dto.completedObjectives)
    );
}

export function mapDrivingLessonDTOsToModels(dtos: DrivingLessonDTO[]): DrivingLessonModel[] {
    return dtos.map(mapDrivingLessonDTOToModel);
}