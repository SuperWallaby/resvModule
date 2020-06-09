import {
  getRoomTypeInfo_GetRoomTypeDatePrices_roomTypeDatePrices,
  getRoomTypeInfo_GetRoomTypeDatePrices_roomTypeDatePrices_datePrices,
  getHouseForPublic_GetHouseForPublic_house_roomTypes,
} from "../types/api";
import { utills } from "@janda-com/front";
import { IPayInfo, IBookerInfo, IRoomSelectInfo } from "./declare";
import { Tstep, IHouseOptions, TOptionsObj } from "../types/type";
import moment from "moment";
import {
  DEFAULT_PAY_INFO,
  DEFAULT_ROOM_SELET_INFO,
  DEFAULT_STEP,
  DEFAULT_BOOKER_INFO,
} from "../types/deafult";
import { HouseOptionsKey } from "../types/enum";
import { IRadiosOps } from "@janda-com/front/build/components/radioButton/RadioButton";
const { arraySum } = utills;

export const getUniqTag = (
  roomTypes: getHouseForPublic_GetHouseForPublic_house_roomTypes[]
) => {
  let uniqHashTag: IRadiosOps[] = [];
  const tagValues = uniqHashTag.map((tag) => tag.value);

  roomTypes?.forEach((roomType) => {
    const uniqTags = roomType.hashTags
      .filter((ht) => !tagValues.includes(ht))
      .map((ht) => {
        return {
          label: ht,
          value: roomType._id,
        };
      });
    uniqHashTag = [...uniqHashTag, ...uniqTags];
  });

  return uniqHashTag;
};

export const getOptionsObj = (options: IHouseOptions[]): TOptionsObj => {
  const returnObj: any = {};
  Object.keys(HouseOptionsKey).forEach((key) => {
    returnObj[key] = options.find((op) => op.key === key);
  });
  return returnObj;
};

//  "방타입들"의 평균 가격을 가져옴
export const totalPriceGetAveragePrice = (
  priceData: getRoomTypeInfo_GetRoomTypeDatePrices_roomTypeDatePrices[]
): number => {
  const averagePrice = arraySum(
    priceData.map((data) => getAveragePrice(data.datePrices || []))
  );
  return averagePrice;
};

// 가격 정보들의 평균가를 가져옴
export const getAveragePrice = (
  priceData: getRoomTypeInfo_GetRoomTypeDatePrices_roomTypeDatePrices_datePrices[]
): number => {
  const averagePrice =
    arraySum(priceData.map((priceD) => priceD.price)) / priceData.length;

  return averagePrice;
};

export const memoRizeSelectInfo = (
  from: Date | null,
  to: Date | null,
  payInfo: IPayInfo,
  bookerInfo: IBookerInfo,
  step: Tstep,
  roomSelectInfo: IRoomSelectInfo[]
) => {
  const copy = Object.assign({}, payInfo);
  copy.password = "";
  if (from && to) {
    sessionStorage.setItem("from", from.toDateString());
    sessionStorage.setItem("to", to.toDateString());
  }
  sessionStorage.setItem("payInfo", JSON.stringify(copy));
  sessionStorage.setItem("bookerInfo", JSON.stringify(bookerInfo));
  sessionStorage.setItem("step", step);
  sessionStorage.setItem("roomSelectInfo", JSON.stringify(roomSelectInfo));
};

const getParsedData = (key: string, DEFAULT: any) => {
  try {
    const tempData = sessionStorage.getItem(key);
    if (!tempData) return DEFAULT;
    const data = JSON.parse(tempData);
    return data || DEFAULT;
  } catch (e) {
    console.error(e);
    return DEFAULT;
  }
};

const getParsedDate = (key: "from" | "to") => {
  const defualtTo = moment().add(1, "day").toDate();
  try {
    const date = sessionStorage.getItem(key);
    if (key === "to" && !date) {
      return defualtTo;
    }
    const data = moment(date || undefined).toDate();
    return data;
  } catch (e) {
    console.error(e);
    if (key === "to") return defualtTo;
    return new Date();
  }
};

export const store = {
  isAsked: false,
};

export const removeAllSaveInfo = () => {
  sessionStorage.removeItem("from");
  sessionStorage.removeItem("to");
  sessionStorage.removeItem("payInfo");
  sessionStorage.removeItem("bookerInfo");
  sessionStorage.removeItem("step");
  sessionStorage.removeItem("roomSelectInfo");
};

export const loadMemo = (
  getKey: "from" | "to" | "payInfo" | "bookerInfo" | "step" | "roomSelectInfo"
) => {
  if (sessionStorage.getItem("from"))
    if (!store.isAsked) {
      const reuslt = window.confirm(
        "이전 예약을 진행하던 기록이 있습니다. 해당 예약을 이어서 진행 하시겠습니까?"
      );
      store.isAsked = true;

      if (!reuslt) {
        removeAllSaveInfo();
      }
    }

  switch (getKey) {
    case "from":
      return getParsedDate("from");
    case "to":
      return getParsedDate("to");
    case "payInfo":
      return getParsedData("payInfo", DEFAULT_PAY_INFO);
    case "roomSelectInfo":
      return getParsedData("roomSelectInfo", DEFAULT_ROOM_SELET_INFO);
    case "bookerInfo":
      return getParsedData("bookerInfo", DEFAULT_BOOKER_INFO);
    case "step":
      return sessionStorage.getItem("step") || DEFAULT_STEP;
  }
};
