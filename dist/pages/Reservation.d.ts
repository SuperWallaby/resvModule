import React from "react";
import { makeBookingForPublicVariables, getHouseForPublic_GetHouseForPublic_house } from "../types/api";
import { TOptionsObj } from "../types/type";
interface IProps {
    makeBookingFn: (param: makeBookingForPublicVariables) => void;
    houseData: getHouseForPublic_GetHouseForPublic_house;
    customMsgs: TOptionsObj;
}
declare const Reservation: React.FC<IProps>;
export default Reservation;
