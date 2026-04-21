import DrivingSchoolModel from "../../model/DrivingSchoolModel";
import  {mapDrivingSchoolViewModel} from "../../viewmodel/DrivingSchoolViewModel";
import DrivingSchoolViewModel from "../../viewmodel/DrivingSchoolViewModel";


const schoolViewModels: DrivingSchoolViewModel[] = SchoolList();

function SchoolList(): DrivingSchoolViewModel[] {
    const modelList: DrivingSchoolModel[] = [
        {schoolName: "Jens' bedste skole", phone: "12 34 56 78", website: "jens@skole.dk", address: "Skolestrædet 3", region: "Nord", pricing: 5000},
        {schoolName: "Oles værste skole", phone: "12 12 34 34", website: "ole@skole.dk", address: "Skolestrædet 3", region: "Syd", pricing: 10000},
        {schoolName: "Oles næstværste skole", phone: "12 12 34 34", website: "oleole@skole.dk", address: "Skolestrædet 3", region: "Syd", pricing: 10000},
        {schoolName: "Oles skole", phone: "12-12-34-34", website: "oles@skole.dk", address: "Skolestrædet 2", region: "Vest", pricing: 12000},
        {schoolName: "Skole-Ole", phone: "12 56 34 89", website: "skole@skole.dk", address: "Skolestrædet 3", region: "Syd", pricing: 10000},
        {schoolName: "test", phone: "12 12 12 34", website: "test@test.com", address: "Skoleby vestgade 3 tv.", region: "Hovedstaden", pricing: 20000},
        {schoolName: "dummy", phone: "5148769", website: "dummy@skole.dk", address: "Skolestrædet 3", region: "Syd", pricing: 9500}];

    return modelList.map(e => mapDrivingSchoolViewModel(e));
}
export default schoolViewModels;

