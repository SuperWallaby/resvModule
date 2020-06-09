import { PricingType } from "../types/enum";
export interface IRoomSelectInfo {
    roomTypeId: string;
    roomTypeName?: string;
    count: IGuestCount;
    pricingType: PricingType;
    roomNames?: string[];
}
export interface IGuestCount {
    male: number;
    female: number;
    roomCount: number;
}
export declare const DEFAULT_ROOMTYPE: any;
export declare const getRoomSelectInfo: (guests: any[] | null, roomTypes: {
    [key: string]: any;
    _id: string;
    name: string;
}[]) => IRoomSelectInfo[];
