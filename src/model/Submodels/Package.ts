import pricing from "./Pricing";

class Package {
    Title: string;
    Description: string;
    Price: pricing



    constructor(
        title: string,
        description: string,
        price: pricing,
    ) {
        this.Title = title;
        this.Description = description;
        this.Price = price;
    }
}
export default Package;