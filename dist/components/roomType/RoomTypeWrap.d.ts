import React from "react";
import { getRoomTypeInfo, getRoomTypeInfoVariables, getHouseForPublic_GetHouseForPublic_house_roomTypes, getHouseForPublic_GetHouseForPublic_house, getRoomTypeInfo_GetRoomTypeById_roomType, getRoomTypeInfo_GetRoomTypeById_roomType_capacity_CapacityRoomTypeDomitory } from "../../types/api";
import { IResvContext, IRoomSelectInfo } from "../../pages/declare";
import { ApolloQueryResult } from "apollo-client";
export declare enum Gender {
    FEMALE = "FEMALE",
    MALE = "MALE"
}
export declare type TDomitoryCapacity = getRoomTypeInfo_GetRoomTypeById_roomType_capacity_CapacityRoomTypeDomitory;
export interface IGuestCount {
    male: number;
    female: number;
    room: number;
    initGender: Gender;
}
export interface IRoomTypeContext {
    sharedQueryVariable: getRoomTypeInfoVariables;
    refetchCapacity: (variables?: getRoomTypeInfoVariables | undefined) => Promise<ApolloQueryResult<getRoomTypeInfo>>;
    capacityData: getRoomTypeInfo_GetRoomTypeById_roomType | undefined;
    isSelected: boolean;
    targetSelectInfo: IRoomSelectInfo | undefined;
    isDomitory: boolean;
    fullDatePrice: number;
}
interface ICheckInOutInfo {
    checkIn: Date;
    checkOut: Date;
}
interface IProps {
    resvContext: IResvContext;
    houseData: getHouseForPublic_GetHouseForPublic_house;
    roomType: getHouseForPublic_GetHouseForPublic_house_roomTypes;
    dateInfo: ICheckInOutInfo;
    urlSearched: boolean;
    handleDoResvBtn: () => void;
}
declare const RoomTypeWrap: React.FC<IProps>;
export default RoomTypeWrap;
