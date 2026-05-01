import StreetAddressGetDTO from "./StreetAddressGetDTO";
import PackageGetDTO from "./PackageGetDTO";


type DrivingSchoolGetDTO = { id: string, name: string, phoneNumber: string, webAddress: string, streetAddress: StreetAddressGetDTO, packages: PackageGetDTO[] }
export default DrivingSchoolGetDTO;
