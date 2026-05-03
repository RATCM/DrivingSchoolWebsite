import DrivingLessonDTO from "./DrivingLessonDTO";
import StudentNameDTO from "./StudentNameDTO";

type StudentDTO = {
    id: string;
    schoolId: string;
    studentName: StudentNameDTO;
    emailAddress: string;
    phoneNumber: string;
    theoryLessons?: unknown;
    drivingLessons: DrivingLessonDTO[];
};
export default StudentDTO;