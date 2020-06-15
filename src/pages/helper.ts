import {
  getRoomTypeInfo_GetRoomTypeDatePrices_roomTypeDatePrices,
  getRoomTypeInfo_GetRoomTypeDatePrices_roomTypeDatePrices_datePrices,
  getHouseForPublic_GetHouseForPublic_house_roomTypes,
} from "../types/api";
import { arraySum, toast, isPhone, getAllFromUrl } from "@janda-com/front";
import { IPayInfo, IBookerInfo, IRoomSelectInfo } from "./declare";
import { Tstep, IHouseOptions, TOptionsObj } from "../types/type";
import moment from "moment";
import {
  DEFAULT_PAY_INFO,
  DEFAULT_ROOM_SELET_INFO,
  DEFAULT_STEP,
  DEFAULT_BOOKER_INFO,
} from "../types/deafult";
import { HouseOptionsKey, PayMethod } from "../types/enum";
import { IRadiosOps } from "@janda-com/front/build/components/radioButton/RadioButton";
import { haveUrlProductName } from "./Reservation";

interface IUrlParamInformation {
  haveUrlProductName: boolean;
  urlTagNames: string[] | null;
  urlDateFrom: Date | undefined;
  urlDateTo: Date | undefined;
  urlRoomTypeName: string | null;
}

export const getUrlInformation = (): IUrlParamInformation => {
  const {
    from: urlFrom,
    to: urlTo,
    tags: urlTags,
    productName: urlRoomTypeName,
  } = getAllFromUrl();
  const haveUrlProductName = !!urlRoomTypeName;
  const replacedProductName = urlRoomTypeName?.replace(/\+/g, "") || null;
  const urlTagNames = urlTags?.split(" ") || null;
  const urlDateFrom = urlFrom ? moment(urlFrom).toDate() : undefined;
  const urlDateTo = urlTo ? moment(urlFrom).add(1, "d").toDate() : undefined;

  return {
    haveUrlProductName,
    urlTagNames,
    urlDateFrom,
    urlDateTo,
    urlRoomTypeName: replacedProductName,
  };
};

export const bookingValidater = (
  bookerInfo: IBookerInfo,
  payInfo: IPayInfo
): boolean => {
  if (!bookerInfo.name) {
    toast.warn("예약자명을 입력 해주세요.");
    $("#nameInput").focus();
    return false;
  }
  if (!isPhone(bookerInfo.phoneNumber)) {
    toast.warn("전화번호를 입력해주세요.");
    $("#phoneInput").focus();
    return false;
  }
  if (!bookerInfo.password) {
    toast.warn("비밀번호를 입력해주세요.");
    $("#passwordInput").focus();
    return false;
  }

  if (!bookerInfo.agreePersonal || !bookerInfo.agreePersonal) {
    toast.warn("약관에 동의바랍니다.");
    return false;
  }

  if (payInfo.paymethod === PayMethod.CARD) {
    if (!payInfo.cardNum) {
      toast.warn("카드번호를 입력해주세요.");
      $("cardInput").focus();
      return false;
    }
    if (payInfo.expireM.length !== 2 || payInfo.expireY.length !== 2) {
      toast.warn("카드 만료기간을 입력 해주세요.");
      $("cardExpireInput").focus();
      return false;
    }
    if (payInfo.idNum.length !== 6) {
      toast.warn("주민번호 앞자리를 채워주세요.");
      $("idNumInput").focus();
      return false;
    }

    if (payInfo.password.length !== 2) {
      toast.warn("카드 비밀번호를 입력 해주세요.");
      $("idNumInput").focus();
      return false;
    }
  }

  return true;
};

export const getUniqTag = (
  roomTypes: getHouseForPublic_GetHouseForPublic_house_roomTypes[]
): IRadiosOps[] => {
  let uniqHashTagValues: string[] = [];

  roomTypes?.forEach((roomType) => {
    const uniqTags = roomType.hashTags.filter(
      (ht) => !uniqHashTagValues.includes(ht)
    );

    uniqHashTagValues = [...uniqHashTagValues, ...uniqTags];
  });

  return uniqHashTagValues.map((t) => ({ value: t, label: t }));
};

export const getOptionsObj = (options: IHouseOptions[] = []): TOptionsObj => {
  const returnObj: any = {};
  Object.keys(HouseOptionsKey).forEach((key) => {
    returnObj[key] = options.find((op) => op.key === key)?.value || "";
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
  const defualtTo = moment().toDate();
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
  if (sessionStorage.getItem("from")) {
    if (!store.isAsked && !haveUrlProductName) {
      const reuslt = window.confirm(
        "이전 예약을 진행하던 기록이 있습니다. 해당 예약을 이어서 진행 하시겠습니까?"
      );

      if (!reuslt) {
        removeAllSaveInfo();
      }
    }
  }

  store.isAsked = true;

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
