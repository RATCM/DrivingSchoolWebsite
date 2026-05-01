import PricingGetDTO from "../DTO/PricingGetDTO";
import Pricing from "../model/Submodels/Pricing";

export function GetPricingDTOtoModel(pricing: PricingGetDTO): Pricing {
    return new Pricing(pricing.amount, pricing.currency);
}
export default GetPricingDTOtoModel;