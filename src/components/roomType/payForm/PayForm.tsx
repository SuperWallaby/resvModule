import React from "react";
import {
  InputText,
  JDalign,
  JDselect,
  JDtypho,
  WindowSizeNumber,
  useSelect,
  useWindowSize,
} from "@janda-com/front";
import { LANG } from "../../../App";
import { IResvContext, IPayInfo } from "../../../pages/declare";
import { PayMethod } from "../../../types/enum";

interface IProps {
  resvContext: IResvContext;
}

const PayForm: React.FC<IProps> = ({ resvContext }) => {
  const {
    payInfo,
    setPayInfo,
    houseData,
    customMsgs,
    bookerInfo,
    setBookerInfo,
  } = resvContext;
  const { bookingPayInfo } = houseData;
  const { width } = useWindowSize();
  const { bankAccountInfo, payMethods } = bookingPayInfo;
  const {
    password,
    expireM,
    expireY,
    idNum,
    cardNum,
    paymethod,
    sender,
  } = payInfo;

  const isCardMode = paymethod === PayMethod.CARD;
  const isPhabletDown = width < WindowSizeNumber.PHABLET;

  const PAYMETHOD_FOR_BOOKER_OP = [
    { value: PayMethod.CARD, label: LANG("card") },
    {
      value: PayMethod.BANK_TRANSFER,
      label: LANG("bank_trans"),
    },
  ].filter((op) => (payMethods || []).includes(op.value));

  function set<T extends keyof IPayInfo>(key: T, value: IPayInfo[T]) {
    setPayInfo({ ...payInfo, [key]: value });
  }

  return (
    <div className="payForm">
      <JDalign
        mb="normal"
        flex={{
          vCenter: true,
          grow: isPhabletDown,
        }}
      >
        <JDtypho className="payForm__label">{LANG("payMethod")}*</JDtypho>
        <JDselect
          selectedOption={PAYMETHOD_FOR_BOOKER_OP.find(
            (so) => so.value === payInfo.paymethod
          )}
          placeholder={" "}
          autoSize
          onChange={(op: any) => {
            set("paymethod", op.value);
          }}
          options={PAYMETHOD_FOR_BOOKER_OP}
          mb="no"
        />
      </JDalign>
      {bankAccountInfo && (
        <JDalign hide={isCardMode}>
          <JDalign
            mb="normal"
            flex={{
              vCenter: true,
              grow: isPhabletDown,
            }}
          >
            <JDtypho className="payForm__label">입금자명</JDtypho>
            <InputText
              mb="no"
              OnChange={(v) => {
                set("sender", v);
              }}
              value={sender}
            />
          </JDalign>
          <JDalign>
            <JDalign
              mb="normal"
              flex={{
                vCenter: true,
                grow: isPhabletDown,
              }}
            >
              <JDtypho className="payForm__label">{LANG("accountNum")}</JDtypho>
              <JDtypho
                style={{
                  whiteSpace: "nowrap",
                }}
                weight={400}
                className="payForm__label"
              >
                {bankAccountInfo.accountNum}
              </JDtypho>
            </JDalign>
          </JDalign>
          <JDalign
            mb="normal"
            flex={{
              vCenter: true,
              grow: isPhabletDown,
            }}
          >
            <JDtypho className="payForm__label">
              {LANG("accountHolder")}
            </JDtypho>
            <JDtypho weight={400} className="payForm__label">
              {bankAccountInfo.accountHolder}
            </JDtypho>
          </JDalign>

          <JDalign
            flex={{
              vCenter: true,
              grow: isPhabletDown,
            }}
          >
            <JDtypho className="payForm__label">{LANG("bankName")}</JDtypho>
            <JDtypho weight={400} className="payForm__label">
              {bankAccountInfo.bankName}
            </JDtypho>
          </JDalign>
        </JDalign>
      )}
      <JDalign hide={!isCardMode} grid>
        <JDalign
          col={{
            full: 6,
            md: 12,
          }}
          mb="normal"
        >
          <JDalign
            mb="normal"
            flex={{
              vCenter: true,
              grow: isPhabletDown,
            }}
          >
            <JDtypho className="payForm__label">{LANG("cardNumber")}*</JDtypho>
            <InputText
              value={cardNum}
              card
              OnChange={(v: any) => {
                set("cardNum", v);
              }}
              id="cardNumInput"
              mb="no"
              placeholder={"**** **** **** ****"}
            />
          </JDalign>
          <JDalign
            mb="normal"
            flex={{
              vCenter: true,
              grow: isPhabletDown,
            }}
          >
            <JDtypho className="payForm__label">{LANG("password")}*</JDtypho>
            <InputText
              id="cardPasswordInput"
              OnChange={(v: any) => {
                set("password", v);
              }}
              maxLength={2}
              value={password}
              type="password"
              mb="no"
              placeholder={LANG("front2")}
            />
          </JDalign>
        </JDalign>
        <JDalign
          col={{
            full: 6,
            md: 12,
          }}
          mb="normal"
        >
          <JDalign
            mb="normal"
            flex={{
              vCenter: true,
              grow: isPhabletDown,
            }}
          >
            <JDtypho className="payForm__label">{LANG("expiration")}*</JDtypho>
            <JDtypho mr="small">{LANG("month")}</JDtypho>
            <InputText
              style={{
                width: "52px",
              }}
              id="cardExpireInput"
              OnChange={(v: any) => {
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
                width: "52px",
              }}
              maxLength={2}
              OnChange={(v: any) => {
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
              grow: isPhabletDown,
            }}
          >
            <JDtypho className="payForm__label">{LANG("id_num")}*</JDtypho>
            <InputText
              id="idNumInput"
              OnChange={(v) => {
                set("idNum", v);
              }}
              value={idNum}
              mb="no"
              max={6}
              placeholder={LANG("front6_id")}
            />
          </JDalign>
        </JDalign>
        {customMsgs.PayPrecaution && (
          <JDtypho size="small">{"*" + customMsgs.PayPrecaution}</JDtypho>
        )}
      </JDalign>
    </div>
  );
};

export default React.memo(
  PayForm,
  ({ resvContext }, { resvContext: resvContext2 }) =>
    resvContext.payInfo === resvContext2.payInfo
);
