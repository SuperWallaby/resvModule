import { PayMethod } from "./enum";
import { IPayInfo, IBookerInfo, IRoomSelectInfo } from "../pages/declare";
import { Tstep } from "./type";

export const DEFAULT_PAY_INFO: IPayInfo = {
  paymethod: PayMethod.CARD,
  cardNum: "",
  password: "",
  expireM: "",
  expireY: "",
  idNum: "",
};

export const DEFAULT_BOOKER_INFO: IBookerInfo = {
  phoneNumber: "",
  name: "",
  password: "",
  memo: "",
  agreeUse: false,
  agreePersonal: false,
};

export const DEFAULT_STEP: Tstep = "input";
export const DEFAULT_ROOM_SELET_INFO: IRoomSelectInfo[] = [];
