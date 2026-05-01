import NameDTO from "./NameDTO";

type StudentRegistryDTO = {
    StudentName: NameDTO,
    EmailAddress: string,
    PhoneNumber: string,
    Password: string,
    InviteId: string }
export default StudentRegistryDTO;