import React from "react";
import {
  InputText,
  JDalign,
  JDselect,
  JDtypho,
  WindowSizeNumber,
  useSelect
} from "@janda-com/front";
import { LANG } from "../../../App";
import "./PayForm.scss";
import { IResvContext, IPayInfo } from "../../../pages/declare";
import { PayMethod } from "../../../types/enum";
import reactWindowSize, { WindowSizeProps } from "react-window-size";

enum SelectBoxSize {
  TWO = "4rem",
  FOUR = "6rem",
  SIX = "9rem",
  FIVE = "11rem"
}

interface IProps {
  resvContext: IResvContext;
}

const PayForm: React.FC<IProps & WindowSizeProps> = ({
  resvContext,
  windowWidth,
  windowHeight
}) => {
  const { payInfo, setPayInfo } = resvContext;
  const { cardNum, password, expireM, expireY, idNum, paymethod } = payInfo;

  const isPhabletDown = windowWidth < WindowSizeNumber.PHABLET;

  const PAYMETHOD_FOR_BOOKER_OP = [
    { value: PayMethod.CARD, label: LANG("card") },
    {
      value: PayMethod.BANK_TRANSFER,
      label: LANG("bank_trans")
    }
  ];

  function set<T extends keyof IPayInfo>(key: T, value: IPayInfo[T]) {
    setPayInfo({ ...payInfo, [key]: value });
  }

  return (
    <div className="payForm">
      <JDalign
        mb="normal"
        flex={{
          vCenter: true,
          grow: isPhabletDown
        }}
      >
        <JDtypho className="payForm__label">{LANG("payMethod")}*</JDtypho>
        <JDselect
          placeholder={" "}
          size={SelectBoxSize.SIX}
          onChange={op => {
            set("paymethod", op.value);
          }}
          options={PAYMETHOD_FOR_BOOKER_OP}
          mb="no"
        />
      </JDalign>
      <JDalign grid>
        <JDalign
          col={{
            full: 6,
            md: 12
          }}
          mb="normal"
        >
          <JDalign
            mb="normal"
            flex={{
              vCenter: true,
              grow: isPhabletDown
            }}
          >
            <JDtypho className="payForm__label">{LANG("cardNumber")}*</JDtypho>
            <InputText mb="no" placeholder={"**** **** **** ****"} />
          </JDalign>
          <JDalign
            mb="normal"
            flex={{
              vCenter: true,
              grow: isPhabletDown
            }}
          >
            <JDtypho className="payForm__label">{LANG("password")}*</JDtypho>
            <InputText
              onChange={v => {
                set("password", v);
              }}
              maxLength={2}
              value={password}
              mb="no"
              placeholder={"front2"}
            />
          </JDalign>
        </JDalign>
        <JDalign
          col={{
            full: 6,
            md: 12
          }}
          mb="normal"
        >
          <JDalign
            mb="normal"
            flex={{
              vCenter: true,
              grow: isPhabletDown
            }}
          >
            <JDtypho className="payForm__label">{LANG("expiration")}*</JDtypho>
            <JDtypho mr="small">{LANG("month")}</JDtypho>
            <InputText
              style={{
                width: "52px"
              }}
              onChange={v => {
                set("expireM", v);
              }}
              maxLength={2}
              value={expireM}
              mb="no"
              placeholder={"MM"}
            />
            <JDtypho mr="small">{LANG("year")}</JDtypho>
            <InputText
              style={{
                width: "52px"
              }}
              maxLength={2}
              onChange={v => {
                set("expireY", v);
              }}
              value={expireY}
              mb="no"
              placeholder={"YY"}
            />
          </JDalign>
          <JDalign
            mb="normal"
            flex={{
              vCenter: true,
              grow: isPhabletDown
            }}
          >
            <JDtypho className="payForm__label">{LANG("id_num")}*</JDtypho>
            <InputText value={idNum} mb="no" placeholder={LANG("front6_id")} />
          </JDalign>
        </JDalign>
      </JDalign>
    </div>
  );
};

export default reactWindowSize(PayForm);
