class StreetsAddressModel {
    address: string;
    postalCode: string;
    city: string;
    region: string;


    constructor(
        address: string,
        postalCode: string,
        city: string,
        region: string,
    ) {
        this.address = address;
        this.postalCode = postalCode;
        this.city = city;
        this.region = region;
    }
}
export default StreetsAddressModel;