import { PriceLine,SubLine } from "../components/DetailPriceView";
import { IRoomSelectInfo } from "../pages/declare";

export const priceSurvey = (data:IRoomSelectInfo[]): PriceLine[] => {
    return data.map((d):PriceLine => {
        return {
            price: d.price,
            sub: d.options?.map((sb):SubLine => {
                return {
                    price: sb.price * sb.count,
                    title: sb.label,
                    describe: `${sb.price} * ${sb.count}`
                }
            }) || [],
            title: d.roomTypeName || "",
            describe: `${d.roomTypeName} * ${d.price}` 
        }
    })
}