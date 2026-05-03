import StudentNameDTO from "./StudentNameDTO";

type InstructorDTO = {
    id: string;
    schoolId: string;
    name: StudentNameDTO;
    emailAddress: string;
    phoneNumber: string;
    DrivingLessonIds: string[];
    TheoryLessonIds: string[];
};
export default InstructorDTO