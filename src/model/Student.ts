import DrivingLessonModel from "./DrivingLessonModel";
import NameModel from "./Submodels/NameModel";

export default class Student {
    id: string;
    schoolId: string;
    name: NameModel;
    emailAddress: string;
    phoneNumber: string;
    theoryLessons?: unknown;
    drivingLessons: DrivingLessonModel[];

    constructor(
        id: string,
        schoolId: string,
        name: NameModel,
        emailAddress: string,
        phoneNumber: string,
        drivingLessons: DrivingLessonModel[] = [],
        theoryLessons?: unknown
    ) {
        this.id = id;
        this.schoolId = schoolId;
        this.name = name;
        this.emailAddress = emailAddress;
        this.phoneNumber = phoneNumber;
        this.drivingLessons = drivingLessons;
        this.theoryLessons = theoryLessons;
    }

}