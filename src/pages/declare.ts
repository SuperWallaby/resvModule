import {
  PricingType,
  getHouseForPublic_GetHouseForPublic_house,
} from "../types/api";

export interface IRoomSelectInfo {
  roomTypeId: string;
  roomTypeName?: string;
  count: IGuestCount;
  pricingType: PricingType;
  img?: string;
  price: number;
}

export interface IGuestCount {
  male: number;
  female: number;
  roomCount: number;
}

export interface IBookerInfo {
  name: string;
  phoneNumber: string;
  password: string;
  memo: string;
  agreeUse: boolean;
  agreePersonal: boolean;
}

export interface IPayInfo {
  paymethod: string;
  cardNum: string;
  password: string;
  expireM: string;
  expireY: string;
  idNum: string;
}

export interface IResvContext {
  payInfo: IPayInfo;
  setPayInfo: React.Dispatch<React.SetStateAction<IPayInfo>>;
  bookerInfo: IBookerInfo;
  setBookerInfo: React.Dispatch<React.SetStateAction<IBookerInfo>>;
  step: "select" | "input" | "check";
  setStep: React.Dispatch<React.SetStateAction<"select" | "input" | "check">>;
  totalPrice: number;
  roomSelectInfo: IRoomSelectInfo[];
  setRoomSelectInfo: React.Dispatch<React.SetStateAction<IRoomSelectInfo[]>>;
  from: Date | null;
  to: Date | null;
  houseData: getHouseForPublic_GetHouseForPublic_house;
}
