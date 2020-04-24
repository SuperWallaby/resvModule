import React from "react";
import {
  InputText,
  JDalign,
  JDselect,
  JDtypho,
  hooks,
  WindowSizeNumber,
} from "@janda-com/front";
import { LANG } from "../../../App";
import "./BookerForm.scss";
import { IResvContext, IBookerInfo } from "../../../pages/declare";
const { useWindowSize } = hooks;

interface IProps {
  resvContext: IResvContext;
}

const BookerForm: React.FC<IProps> = ({ resvContext }) => {
  const { width } = useWindowSize();
  const { setBookerInfo, bookerInfo } = resvContext;
  const { memo, name, password, phoneNumber } = bookerInfo;

  function set<T extends keyof IBookerInfo>(key: T, value: IBookerInfo[T]) {
    setBookerInfo({ ...bookerInfo, [key]: value });
  }

  const isPhabletDown = width < WindowSizeNumber.PHABLET;

  return (
    <div className="bookerForm">
      <JDalign
        mb="normal"
        flex={{
          vCenter: true,
          grow: isPhabletDown,
        }}
      >
        <JDtypho className="bookerForm__label">{LANG("name")}*</JDtypho>
        <InputText
          id="nameInput"
          onChange={(v: any) => {
            set("name", v);
          }}
          value={name}
          mb="no"
        />
      </JDalign>
      <JDalign
        mb="normal"
        flex={{
          vCenter: true,
          grow: isPhabletDown,
        }}
      >
        <JDtypho className="bookerForm__label">{LANG("phoneNumber")}*</JDtypho>
        {/* <JDselect textOverflow="visible" mr="normal" mb="no" /> */}
        <JDselect
          autoSize
          selectedOption={{ label: "+81", value: 81 }}
          textOverflow="visible"
          mr="normal"
          mb="no"
        />
        <InputText
          id="phoneInput"
          hyphen
          autoComplete="off"
          onChange={(op: any) => {
            set("phoneNumber", op);
          }}
          value={phoneNumber}
          mb="no"
          placeholder={LANG("only_number")}
        />
      </JDalign>
      <JDalign
        mb="normal"
        flex={{
          vCenter: true,
          grow: isPhabletDown,
        }}
      >
        <JDtypho className="bookerForm__label">{LANG("password")}*</JDtypho>
        <InputText
          autoComplete="off"
          id="passwordInput"
          onChange={(v: any) => {
            set("password", v);
          }}
          value={password}
          type="password"
          mb="no"
        />
      </JDalign>
      <JDalign
        mb="normal"
        flex={{
          vCenter: true,
          grow: isPhabletDown,
        }}
      >
        <JDtypho className="bookerForm__label">{LANG("memo")}</JDtypho>
        <InputText
          onChange={(v: any) => {
            set("memo", v);
          }}
          value={memo}
          mb="no"
        />
      </JDalign>
    </div>
  );
};

export default React.memo(
  BookerForm,
  ({ resvContext }, { resvContext: resvContext2 }) =>
    resvContext.bookerInfo === resvContext2.bookerInfo
);
