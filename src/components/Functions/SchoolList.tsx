import DrivingSchoolModel from "../../model/DrivingSchoolModel";
import  {mapDrivingSchoolViewModel} from "../../viewmodel/DrivingSchoolViewModel";
import DrivingSchoolViewModel from "../../viewmodel/DrivingSchoolViewModel";


const schoolViewModels: DrivingSchoolViewModel[] = SchoolList();

function SchoolList(): DrivingSchoolViewModel[] {
    const modelList: DrivingSchoolModel[] = [
        {schoolName: "Jens' bedste skole", phone: "12 34 56 78", website: "jens@skole.dk", address: "Skolestrædet 3", region: "Nord", pricing: 5000},
        {schoolName: "Oles værste skole", phone: "12 12 34 34", website: "ole@skole.dk", address: "Skolestrædet 3", region: "Syd", pricing: 10000}];

    return modelList.map(e => mapDrivingSchoolViewModel(e));
}
export default schoolViewModels;

