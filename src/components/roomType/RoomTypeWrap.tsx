import React, { useState, Fragment } from "react";
import { GET_ROOM_TYPE_INFO } from "../../apollo/queries";
import {
  getRoomTypeInfo,
  getRoomTypeInfoVariables,
  getHouseForPublic_GetHouseForPublic_house_roomTypes,
  getHouseForPublic_GetHouseForPublic_house
} from "../../types/api";
import client from "../../apollo/apolloClient";
import { useQuery } from "react-apollo";
import { utills } from "@janda-com/front";
import RoomType from "./RoomType";
import { getAveragePrice } from "../../pages/helper";
import { IResvContext } from "../../pages/Reservation";

const { queryDataFormater, instanceOfA } = utills;

export enum Gender {
  FEMALE = "FEMALE",
  MALE = "MALE"
}

export interface IGuestCount {
  male: number;
  female: number;
  room: number;
  initGender: Gender;
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
}

const RoomTypeWrap: React.FC<IProps> = ({
  roomType,
  resvContext,
  houseData,
  dateInfo
}) => {
  const { selectedRoom, setSelectedRoom } = resvContext;
  const { checkIn, checkOut } = dateInfo;
  const { _id: houseId } = houseData;
  const { _id: roomTypeId } = roomType;
  const [guestCountValue, setGuestCount] = useState<IGuestCount>({
    male: 0,
    female: 0,
    room: 0,
    initGender: Gender.MALE
  });

  const initMale = guestCountValue.initGender === Gender.FEMALE;
  const initCount = initMale ? guestCountValue.male : guestCountValue.female;

  const shouldSkip = () =>
    checkIn && checkOut && checkIn != checkOut ? false : true;

  const { data, loading: countLoading, networkStatus } = useQuery<
    getRoomTypeInfo,
    getRoomTypeInfoVariables
  >(GET_ROOM_TYPE_INFO, {
    client,
    notifyOnNetworkStatusChange: true,
    skip: shouldSkip(),
    variables: {
      roomTypeId,
      GetRoomTypeDatePricesInput: {
        checkOut,
        checkIn,
        houseId,
        roomTypeIds: [roomTypeId]
      },
      RoomTypeCapacityInput: {
        checkInOut: {
          checkIn,
          checkOut
        },
        initValue: {
          count: initCount,
          gender: guestCountValue.initGender
        }
      }
    }
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
        <div className="roomTypeCard roomTypeCard--loadingCard" />
      </Fragment>
    );

  if (!roomType) {
    console.error(`can not load roomType with this id ${roomTypeId}`);
    return <div />;
  }

  if (roomType.roomCount === 0) return <div />;

  const truePrice = getAveragePrice(roomTypeDatePrices[0]?.datePrices || []);
  const formattedTruePrice = Math.floor(truePrice / 10) * 10;

  return <RoomType totalPrice={formattedTruePrice} roomType={roomType} />;
};

export default RoomTypeWrap;
