import NameModel from "./Submodels/NameModel";

export default class Instructor {
    id: string;
    schoolId: string;
    name: NameModel;
    emailAddress: string;
    phoneNumber: string;
    drivingLessonIds: string[];
    theoryLessonIds: string[];

    constructor(
        id: string,
        schoolId: string,
        name: NameModel,
        emailAddress: string,
        phoneNumber: string,
        drivingLessonIds: string[] = [],
        theoryLessonIds: string[] = []
    ) {
        this.id = id;
        this.schoolId = schoolId;
        this.name = name;
        this.emailAddress = emailAddress;
        this.phoneNumber = phoneNumber;
        this.drivingLessonIds = drivingLessonIds;
        this.theoryLessonIds = theoryLessonIds;
    }
}