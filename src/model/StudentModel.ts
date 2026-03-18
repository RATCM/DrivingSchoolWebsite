import DrivingSchoolModel from "./DrivingSchoolModel";
import UserModel from "./UserModel";

class StudentModel extends UserModel {

    constructor(
        name: string,
        email: string,
        passwordHash: string,
        phone: string,
        drivingSchool: DrivingSchoolModel | null,
    ) {
        super(name,email,passwordHash,phone,drivingSchool)
    }

}
export default StudentModel;