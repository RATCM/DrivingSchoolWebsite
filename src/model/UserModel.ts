import DrivingSchoolModel from "./DrivingSchoolModel";

abstract class UserModel {
    name: string;
    email: string;
    passwordHash: string;
    phone: string;
    drivingSchool: DrivingSchoolModel | null;

    protected constructor(
                name: string,
                email: string,
                passwordHash: string,
                phone: string,
                drivingSchool: DrivingSchoolModel | null,
    ) {
        this.name = name;
        this.email = email;
        this.passwordHash = passwordHash;
        this.phone = phone;
        this.drivingSchool = drivingSchool;
    }
}
export default UserModel;