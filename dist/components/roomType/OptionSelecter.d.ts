import { getHouseForPublic_GetHouseForPublic_house_roomTypes_optionalItems } from "../../types/api";
import { IRoomSelectInfo } from "../../pages/declare";
import React from "react";
import { ISet } from "@janda-com/front/build/types/interface";
interface IProp {
    optionalItems: getHouseForPublic_GetHouseForPublic_house_roomTypes_optionalItems[];
    targetSelectRoom: IRoomSelectInfo | undefined;
    setRoomSelectInfo: ISet<IRoomSelectInfo[]>;
    roomSelectInfo: IRoomSelectInfo[];
}
export declare const OptionSelecter: React.FC<IProp>;
export {};
