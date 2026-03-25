import DrivingSchoolModel from "../../model/DrivingSchoolModel";
import {mapDrivingSchoolViewModel} from "../../viewmodel/DrivingSchoolViewModel";

function SchoolList() {
    const drivingSchool = new DrivingSchoolModel("Jens' bedste skole","12 34 56 78","jens@skole.dk", "Skolestrædet 3", "Nord", 5000);
    const drivingSchool2Cool = new DrivingSchoolModel("Oles værste skole","12 12 34 34","ole@skole.dk", "Skolestrædet 3", "Syd", 10000);
    const vm = mapDrivingSchoolViewModel(drivingSchool);
    const vm2 = mapDrivingSchoolViewModel(drivingSchool2Cool);

    const list = {vm, vm2};
}

