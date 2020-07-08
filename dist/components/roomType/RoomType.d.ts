import React from "react";
import { getHouseForPublic_GetHouseForPublic_house_roomTypes } from "../../types/api";
import { IResvContext } from "../../pages/declare";
import { IRoomTypeContext } from "./RoomTypeWrap";
interface IProps {
    resvContext: IResvContext;
    roomType: getHouseForPublic_GetHouseForPublic_house_roomTypes;
    dailyPrice: number;
    roomTypeContext: IRoomTypeContext;
    countLoading: boolean;
    popUpDetailPage?: boolean;
    priceLoading: boolean;
    handleDoResvBtn: () => void;
}
declare const RoomType: React.FC<IProps>;
export default RoomType;
