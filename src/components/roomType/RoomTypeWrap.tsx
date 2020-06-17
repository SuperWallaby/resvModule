import React, { Fragment } from "react";
import { GET_ROOM_TYPE_INFO } from "../../apollo/queries";
import {
  getRoomTypeInfo,
  getRoomTypeInfoVariables,
  getHouseForPublic_GetHouseForPublic_house_roomTypes,
  getHouseForPublic_GetHouseForPublic_house,
  getRoomTypeInfo_GetRoomTypeById_roomType,
  getRoomTypeInfo_GetRoomTypeById_roomType_capacity_CapacityRoomTypeDomitory,
} from "../../types/api";
import client from "../../apollo/apolloClient";
import { useQuery } from "react-apollo";
import { queryDataFormater, JDpreloader, IUseModal } from "@janda-com/front";
import RoomType from "./RoomType";
import { getAveragePrice } from "../../pages/helper";
import { IResvContext, IRoomSelectInfo } from "../../pages/declare";
import { PricingType } from "../../types/enum";
import moment from "moment";
import { ApolloQueryResult } from "apollo-client";

export enum Gender {
  FEMALE = "FEMALE",
  MALE = "MALE",
}

export type TDomitoryCapacity = getRoomTypeInfo_GetRoomTypeById_roomType_capacity_CapacityRoomTypeDomitory;

export interface IGuestCount {
  male: number;
  female: number;
  room: number;
  initGender: Gender;
}

export interface IRoomTypeContext {
  sharedQueryVariable: getRoomTypeInfoVariables;
  refetchCapacity: (
    variables?: getRoomTypeInfoVariables | undefined
  ) => Promise<ApolloQueryResult<getRoomTypeInfo>>;
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

const RoomTypeWrap: React.FC<IProps> = ({
  roomType,
  resvContext,
  houseData,
  dateInfo,
  urlSearched,
  handleDoResvBtn,
}) => {
  const { roomSelectInfo, from, to } = resvContext;
  const { checkIn } = dateInfo;
  const { _id: houseId } = houseData;
  const { _id: roomTypeId } = roomType;

  const checkOut = moment(checkIn).add(1, "d").toDate();
  const shouldSkip = () =>
    checkIn && checkOut && checkIn != checkOut ? false : true;

  const sharedVariable = {
    roomTypeId,
    GetRoomTypeDatePricesInput: {
      checkOut,
      checkIn,
      houseId,
      roomTypeIds: [roomTypeId],
    },
    RoomTypeCapacityInput: {
      checkInOut: {
        checkIn,
        checkOut,
      },
      initValue: {
        count: 0,
        gender: Gender.MALE,
      },
    },
  };

  const {
    data,
    loading: countLoading,
    refetch: refetchCapacity,
    networkStatus,
  } = useQuery<getRoomTypeInfo, getRoomTypeInfoVariables>(GET_ROOM_TYPE_INFO, {
    client,
    skip: shouldSkip(),
    variables: {
      ...sharedVariable,
    },
  });

  const roomTypeDatePrices =
    queryDataFormater(
      data,
      "GetRoomTypeDatePrices",
      "roomTypeDatePrices",
      []
    ) || [];

  const capacityData =
    queryDataFormater(data, "GetRoomTypeById", "roomType", undefined) ||
    undefined;

  if (networkStatus === 1)
    return (
      <Fragment>
        <div className="roomType roomType--loadingCard" />
      </Fragment>
    );

  if (!roomType) {
    console.error(`can not load roomType with this id ${roomTypeId}`);
    return <div />;
  }

  if (roomType.roomCount === 0) return <div />;

  const dailyPrice = getAveragePrice(roomTypeDatePrices[0]?.datePrices || []);
  const formattedDailyPrice = Math.floor(dailyPrice / 10) * 10;
  const isSelected =
    roomSelectInfo.find((r) => r.roomTypeId === roomType._id) !== undefined;
  const isDomitory = roomType.pricingType === PricingType.DOMITORY;
  const diff = moment(to || new Date()).diff(from || new Date(), "d");

  const targetSelectInfo = roomSelectInfo.find(
    (r) => r.roomTypeId === roomType._id
  );
  const fullDatePrice = (diff || 1) * formattedDailyPrice;

  if (!capacityData) {
    console.error(`can not load roomType with this id ${roomTypeId}`);
    return <div />;
  }

  const roomTypeContext: IRoomTypeContext = {
    refetchCapacity,
    capacityData,
    isSelected,
    targetSelectInfo,
    isDomitory,
    fullDatePrice,
    sharedQueryVariable: sharedVariable,
  };

  return (
    <Fragment>
      <RoomType
        handleDoResvBtn={handleDoResvBtn}
        priceLoading={networkStatus === 1}
        popUpDetailPage={urlSearched}
        countLoading={countLoading}
        roomTypeContext={roomTypeContext}
        resvContext={resvContext}
        dailyPrice={formattedDailyPrice}
        roomType={roomType}
      />
      <JDpreloader floating loading={countLoading} />
    </Fragment>
  );
};

export default RoomTypeWrap;
