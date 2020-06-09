import React from "react";
import { IResvContext, IRoomSelectInfo } from "../../pages/declare";
import { getHouseForPublic_GetHouseForPublic_house_roomTypes } from "../../types/api";
import { IRoomTypeContext } from "./RoomTypeWrap";
interface IProps {
    resvContext: IResvContext;
    roomType: getHouseForPublic_GetHouseForPublic_house_roomTypes;
    fullDatePrice: number;
    targetSelectInfo: IRoomSelectInfo;
    isDomitory: boolean;
    roomTypeContext: IRoomTypeContext;
    availableCount: {
        maleCount: number;
        femaleCount: number;
        roomCount: number;
    };
}
declare const CountSelecter: React.FC<IProps>;
export default CountSelecter;
