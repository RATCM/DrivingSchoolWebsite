import DrivingSchoolModel from "../../model/DrivingSchoolModel";
import {mapDrivingSchoolViewModel} from "../../viewmodel/DrivingSchoolViewModel";
import StreetsAddressModel from "../../model/Submodels/StreetsAddressModel";
import Package from "../../model/Submodels/Package";
import Pricing from "../../model/Submodels/Pricing";

function SchoolList() {
    const drivingSchool = new DrivingSchoolModel("0","Jens' bedste skole","12 34 56 78","jens@skole.dk", new StreetsAddressModel("Skolestrædet 3","2800","Lyngby","Hovedstaden"), [new Package("ab","ab",new Pricing(0,"DKK"))]);
    const drivingSchool2Cool = new DrivingSchoolModel("0","Oles værste skole","12 12 34 34","ole@skole.dk", new StreetsAddressModel("Skolestrædet 3","2800","Lyngby","Hovedstaden"), [new Package("ab","ab",new Pricing(0,"DKK"))]);
    const vm = mapDrivingSchoolViewModel(drivingSchool);
    const vm2 = mapDrivingSchoolViewModel(drivingSchool2Cool);

    const list = {vm, vm2};
}

