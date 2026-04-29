import pricing from "./Pricing";

class Package {
    title: string;
    description: string;
    price: pricing



    constructor(
        title: string,
        description: string,
        price: pricing,
    ) {
        this.title = title;
        this.description = description;
        this.price = price;
    }
}
export default Package;