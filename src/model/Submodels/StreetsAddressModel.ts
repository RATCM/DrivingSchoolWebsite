class StreetsAddressModel {
    AddressLine: string;
    PostalCode: string;
    City: string;
    Region: string;


    constructor(
        addressLine: string,
        postalCode: string,
        city: string,
        region: string,
    ) {
        this.AddressLine = addressLine;
        this.PostalCode = postalCode;
        this.City = city;
        this.Region = region;
    }
}
export default StreetsAddressModel;