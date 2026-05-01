class Pricing {
    Amount: number;
    Currency: string;



    constructor(
        price: number,
        currency: string,
    ) {
        this.Amount = price;
        this.Currency = currency;
    }
}
export default Pricing;