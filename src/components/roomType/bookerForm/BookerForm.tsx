import React from "react";
import {
  InputText,
  JDalign,
  JDselect,
  JDtypho,
  useSelect,
  WindowSizeNumber
} from "@janda-com/front";
import { LANG } from "../../../App";
import { NGO_NUMS } from "../../nationalcode";
import "./BookerForm.scss";
import { IResvContext, IBookerInfo } from "../../../pages/declare";
import reactWindowSize, { WindowSizeProps } from "react-window-size";

interface IProps {
  resvContext: IResvContext;
}

const BookerForm: React.FC<IProps & WindowSizeProps> = ({
  resvContext,
  windowWidth
}) => {
  const { setBookerInfo, bookerInfo } = resvContext;
  const { memo, name, password, phoneNumber } = bookerInfo;

  function set<T extends keyof IBookerInfo>(key: T, value: IBookerInfo[T]) {
    setBookerInfo({ ...bookerInfo, [key]: value });
  }

  const isPhabletDown = windowWidth < WindowSizeNumber.PHABLET;

  return (
    <div className="bookerForm">
      <JDalign
        mb="normal"
        flex={{
          vCenter: true,
          grow: isPhabletDown
        }}
      >
        <JDtypho className="bookerForm__label">{LANG("name")}*</JDtypho>
        <InputText
          onChange={v => {
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
          grow: isPhabletDown
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
          hyphen
          onChange={op => {
            set("phoneNumber", op.value);
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
          grow: isPhabletDown
        }}
      >
        <JDtypho className="bookerForm__label">{LANG("password")}*</JDtypho>
        <InputText
          onChange={v => {
            set("password", v);
          }}
          maxLength={2}
          value={password}
          mb="no"
        />
      </JDalign>
      <JDalign
        mb="normal"
        flex={{
          vCenter: true,
          grow: isPhabletDown
        }}
      >
        <JDtypho className="bookerForm__label">{LANG("memo")}</JDtypho>
        <InputText
          onChange={v => {
            set("memo", v);
          }}
          value={memo}
          mb="no"
        />
      </JDalign>
    </div>
  );
};

export default reactWindowSize(BookerForm);
