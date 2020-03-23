import { getRoomTypeInfo_GetRoomTypeDatePrices_roomTypeDatePrices, getRoomTypeInfo_GetRoomTypeDatePrices_roomTypeDatePrices_datePrices } from "../types/api"
import { utills } from "@janda-com/front";
const { arraySum } = utills;


// 날자들에 대해서 방타입들의 평균 가격을 가져옴
export const totalPriceGetAveragePrice = (
    priceData: getRoomTypeInfo_GetRoomTypeDatePrices_roomTypeDatePrices[]
): number => {
    const averagePrice = arraySum(
        priceData.map(data => getAveragePrice(data.datePrices || []))
    );
    return averagePrice;
};

// 위쪽 함수 종속
export const getAveragePrice = (
    priceData: getRoomTypeInfo_GetRoomTypeDatePrices_roomTypeDatePrices_datePrices[]
): number => {
    const averagePrice =
        arraySum(priceData.map(priceD => priceD.price)) / priceData.length;

    return averagePrice;
};