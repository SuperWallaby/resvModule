import { getRoomTypeInfo_GetRoomTypeDatePrices_roomTypeDatePrices, getRoomTypeInfo_GetRoomTypeDatePrices_roomTypeDatePrices_datePrices, getHouseForPublic_GetHouseForPublic_house_roomTypes } from "../types/api";
import { IPayInfo, IBookerInfo, IRoomSelectInfo } from "./declare";
import { Tstep, IHouseOptions, TOptionsObj } from "../types/type";
import { IRadiosOps } from "@janda-com/front/build/components/radioButton/RadioButton";
interface IUrlParamInformation {
    urlTagNames: string[] | null;
    urlDateFrom: Date | undefined;
    urlDateTo: Date | undefined;
    urlRoomTypeCode: string | null;
    urlRoomTypeName: string | null;
    urlProductIndex: number | null;
    haveUrlProduct: boolean;
}
export declare const getUrlInformation: () => IUrlParamInformation;
export declare const bookingValidater: (bookerInfo: IBookerInfo, payInfo: IPayInfo) => boolean;
export declare const getUniqTag: (roomTypes: getHouseForPublic_GetHouseForPublic_house_roomTypes[]) => IRadiosOps[];
export declare const getOptionsObj: (options?: IHouseOptions[]) => TOptionsObj;
export declare const totalPriceGetAveragePrice: (priceData: getRoomTypeInfo_GetRoomTypeDatePrices_roomTypeDatePrices[]) => number;
export declare const getAveragePrice: (priceData: getRoomTypeInfo_GetRoomTypeDatePrices_roomTypeDatePrices_datePrices[]) => number;
export declare const memoRizeSelectInfo: (from: Date | null, to: Date | null, payInfo: IPayInfo, bookerInfo: IBookerInfo, step: Tstep, roomSelectInfo: IRoomSelectInfo[]) => void;
export declare const store: {
    isAsked: boolean;
};
export declare const removeAllSaveInfo: () => void;
export declare const loadMemo: (getKey: "from" | "to" | "payInfo" | "bookerInfo" | "step" | "roomSelectInfo") => any;
export {};
