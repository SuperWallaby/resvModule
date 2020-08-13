import { PriceLine,SubLine } from "../components/DetailPriceView";
import { IRoomSelectInfo } from "../pages/declare";
import { autoComma } from "@janda-com/front";
import { PricingType } from "../types/api";

export const priceSurvey = (data:IRoomSelectInfo[]): PriceLine[] => {

    const tempCount = data.map((d) => ({
        count: d.count.female + d.count.male + d.count.roomCount,
        price: d.price,
        options: d.options,
        roomTypeName: d.roomTypeName,
        pricingType: d.pricingType
    }))

    return tempCount.map((d):PriceLine => {
        return {
            price: d.price,
            sub: d.options?.map((sb):SubLine => {
                return {
                    price: sb.price * sb.count,
                    title: sb.label,
                    describe: `${autoComma(sb.price)} x ${sb.count}${d.pricingType === PricingType.DOMITORY ? "명" : "개"}`
                }
            }) || [],
            title: d.roomTypeName || "",
            describe: `${autoComma(d.price)} x ${d.count}${d.pricingType === PricingType.DOMITORY ? "명" : "개"}` 
        }
    })
}