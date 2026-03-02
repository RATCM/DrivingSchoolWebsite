import DrivingSchoolModel from "./DrivingSchoolModel";

abstract class UserModel {
    name: string;
    email: string;
    passwordHash: string;
    phone: number;
    drivingSchool: DrivingSchoolModel | null = null;

    protected constructor(
                name: string,
                email: string,
                passwordHash: string,
                phone: number,
    ) {
        this.name = name;
        this.email = email;
        this.passwordHash = passwordHash;
        this.phone = phone;
    }
}
export default UserModel;