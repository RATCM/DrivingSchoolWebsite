import UserModel from "../model/UserModel";

type UserViewModel = {
    name: string,
    email: string,
    phone: string,
    drivingSchool: string,
};

export function mapUserViewModel(model: UserModel): UserViewModel {
    if (!model.drivingSchool) {
        return {
            name: `${model.name}`,
            email: `${model.email}`,
            phone: `${model.phone}`,
            drivingSchool: ``,
        }
    }
    return {
        name: `${model.name}`,
        email: `${model.email}`,
        phone: `${model.phone}`,
        drivingSchool: `${model.drivingSchool.schoolName}`,
    }
}