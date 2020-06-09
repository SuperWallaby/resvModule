import { getRoomTypeInfo_GetRoomTypeDatePrices_roomTypeDatePrices, getRoomTypeInfo_GetRoomTypeDatePrices_roomTypeDatePrices_datePrices } from '../types/api';
import { IPayInfo, IBookerInfo, IRoomSelectInfo } from './declare';
import { Tstep, IHouseOptions, TOptionsObj } from '../types/type';
export declare const getOptionsObj: (options: IHouseOptions[]) => TOptionsObj;
export declare const totalPriceGetAveragePrice: (priceData: getRoomTypeInfo_GetRoomTypeDatePrices_roomTypeDatePrices[]) => number;
export declare const getAveragePrice: (priceData: getRoomTypeInfo_GetRoomTypeDatePrices_roomTypeDatePrices_datePrices[]) => number;
export declare const memoRizeSelectInfo: (from: Date | null, to: Date | null, payInfo: IPayInfo, bookerInfo: IBookerInfo, step: Tstep, roomSelectInfo: IRoomSelectInfo[]) => void;
export declare const store: {
    isAsked: boolean;
};
export declare const removeAllSaveInfo: () => void;
export declare const loadMemo: (getKey: "from" | "to" | "payInfo" | "bookerInfo" | "step" | "roomSelectInfo") => any;
