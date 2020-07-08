import React from "react";
import { makeBookingForPublicVariables, getHouseForPublic_GetHouseForPublic_house } from "../types/api";
import { TOptionsObj } from "../types/type";
interface IProps {
    makeBookingFn: (param: makeBookingForPublicVariables) => void;
    houseData: getHouseForPublic_GetHouseForPublic_house;
    customMsgs: TOptionsObj;
}
export declare const urlDateFrom: Date | undefined, haveUrlProduct: boolean, urlDateTo: Date | undefined, urlTagNames: string[] | null, urlProductIndex: number | null, urlRoomTypeName: string | null, urlRoomTypeCode: string | null;
declare const Reservation: React.FC<IProps>;
export default Reservation;
