import DrivingSchoolModel from "./DrivingSchoolModel";
import UserModel from "./UserModel";

class InstructorModel extends UserModel {

    constructor(
        name: string,
        email: string,
        passwordHash: string,
        phone: number,
        drivingSchool: DrivingSchoolModel | null,
    ) {
        super(name,email,passwordHash,phone,drivingSchool)

    }

}
export default InstructorModel;