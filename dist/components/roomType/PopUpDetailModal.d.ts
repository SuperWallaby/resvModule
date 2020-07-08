import React from "react";
import { IUseModal } from "@janda-com/front";
import { IResvContext } from "../../pages/declare";
import { getHouseForPublic_GetHouseForPublic_house_roomTypes, getHouseForPublic_GetHouseForPublic_house_roomTypes_optionalItems } from "../../types/api";
import { IRoomTypeContext } from "./RoomTypeWrap";
interface IProp {
    popUpProductClose: () => void;
    productVeiwerModal: IUseModal;
    isSoldOut: boolean;
    images: string[];
    handleDoResvBtn: () => void;
    resvContext: IResvContext;
    roomType: getHouseForPublic_GetHouseForPublic_house_roomTypes;
    roomTypeContext: IRoomTypeContext;
    availableCount: {
        maleCount: number;
        femaleCount: number;
        roomCount: number;
    };
    optionalItems: getHouseForPublic_GetHouseForPublic_house_roomTypes_optionalItems[];
    DailyPrice: () => JSX.Element;
}
export declare const PopUpDetailModal: React.FC<IProp>;
export {};
