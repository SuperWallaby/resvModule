import { TDomitoryCapacity } from "./RoomTypeWrap";
import { instanceOfA } from "@janda-com/front";
import { getRoomTypeInfo_GetRoomTypeById_roomType } from "../../types/api";

export const getAvailableCountFromQuery = (
  capacityData: getRoomTypeInfo_GetRoomTypeById_roomType
) => {
  let availableCount = {
    maleCount: 0,
    femaleCount: 0,
    roomCount: 0,
  };

  if (instanceOfA<TDomitoryCapacity>(capacityData.capacity, "availableCount")) {
    const {
      availableCount: { female, male },
    } = capacityData.capacity;
    availableCount = {
      femaleCount: female,
      maleCount: male,
      roomCount: 0,
    };
  } else {
    const { count } = capacityData.capacity;
    availableCount = {
      femaleCount: 0,
      maleCount: 0,
      roomCount: count,
    };
  }

  return availableCount;
};
