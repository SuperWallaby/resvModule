import React, { useState, useEffect } from "react";
import DateSelecter from "../components/DateSelecter";
import {
  useDayPicker,
  useModal,
  JDradioButton,
  JDalign,
  JDdayPickerModal,
  JDtypho,
  utills,
  JDbutton,
  toast,
  JDdayPicker,
  useRadioButton,
} from "@janda-com/front";
import SelectViewer from "../components/SelectViewer";
import {
  makeBookingForPublicVariables,
  getHouseForPublic_GetHouseForPublic_house,
  getHouseForPublic_GetHouseForPublic_house_houseConfig_options,
} from "../types/api";
import RoomTypeWrap from "../components/roomType/RoomTypeWrap";
import { LANG } from "../App";
import {
  IRoomSelectInfo,
  IResvContext,
  IBookerInfo,
  IPayInfo,
} from "./declare";
import BookerForm from "../components/roomType/bookerForm/BookerForm";
import { NGO_NUMS } from "../components/nationalcode";
import PayForm from "../components/roomType/payForm/PayForm";
import PrevSelectViewer from "../components/PrevSelectViewer";
import AgreeBlock from "../components/AgreeBlock";
import { PayMethod, PricingType, Funnels } from "../types/enum";
import $ from "jquery";
import { Tstep, TOptionsObj } from "../types/type";
import { loadMemo, memoRizeSelectInfo } from "./helper";
import { isPhone } from "@janda-com/front";
import { getAllFromUrl } from "@janda-com/front";
import moment from "moment";
import { store } from "./helper";

const { arraySum } = utills;

interface IProps {
  makeBookingFn: (param: makeBookingForPublicVariables) => void;
  houseData: getHouseForPublic_GetHouseForPublic_house;
  customMsgs: TOptionsObj;
}
const { from: urlFrom, to: urlTo } = getAllFromUrl() as any;
const urlDateFrom = urlFrom ? moment(urlFrom).toDate() : undefined;
const urlDateTo = urlTo ? moment(urlTo).toDate() : undefined;

if (urlDateFrom) {
  store.isAsked = true;
}

const Reservation: React.FC<IProps> = ({
  houseData,
  makeBookingFn,
  customMsgs,
}) => {
  const dayPickerModalHook = useModal(false);
  // TODO 여기서 sameDate일경우에
  const dayPickerHook = useDayPicker(
    urlDateFrom || loadMemo("from"),
    urlDateTo || loadMemo("to")
  );
  const [payInfo, setPayInfo] = useState<IPayInfo>(loadMemo("payInfo"));
  const radioButtonHook = useRadioButton(
    [],
    [
      {
        label: "오션뷰",
        value: "OSV",
      },
      {
        label: "마운틴뷰",
        value: "MTV",
      },
      {
        label: "할인",
        value: "SALE",
      },
    ]
  );

  const [bookerInfo, setBookerInfo] = useState<IBookerInfo>(
    loadMemo("bookerInfo")
  );
  const [step, setStep] = useState<Tstep>(loadMemo("step"));
  const [roomSelectInfo, setRoomSelectInfo] = useState<IRoomSelectInfo[]>(
    loadMemo("roomSelectInfo")
  );
  const selectedPrice = arraySum(roomSelectInfo.map((rs) => rs.price));

  const validater = (): boolean => {
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

  const handleDoResvBtn = () => {
    if (validater()) {
      const { memo, name, password, phoneNumber } = bookerInfo;
      const {
        cardNum,
        expireM,
        expireY,
        idNum,
        password: cardPassword,
        paymethod,
      } = payInfo;
      makeBookingFn({
        bookerParams: {
          agreePrivacyPolicy: true,
          memo,
          email: "crawl1234@nave.com",
          name: name,
          password: password,
          phoneNumber: phoneNumber,
          funnels: Funnels.HOMEPAGE,
        },
        checkInOut: {
          checkIn: from,
          checkOut: to,
        },
        paymentParams: {
          payMethod: paymethod as PayMethod,
          price: selectedPrice,
          cardPayInfo: {
            cardNo: cardNum,
            cardPw: cardPassword,
            expMonth: expireM,
            expYear: expireY,
            idNo: idNum,
          },
        },
        guestDomitoryParams: roomSelectInfo
          .filter((ri) => ri.pricingType === PricingType.DOMITORY)
          .map((rs) => ({
            countFemale: rs.count.female,
            countMale: rs.count.male,
            roomTypeId: rs.roomTypeId,
          })),
        guestRoomParams: roomSelectInfo
          .filter((ri) => ri.pricingType === PricingType.ROOM)
          .map((rs) => ({
            countRoom: rs.count.roomCount,
            roomTypeId: rs.roomTypeId,
          })),
      });
    }
  };

  const { from, to } = dayPickerHook;
  const { roomTypes, houseConfig } = houseData;
  const { bookingConfig } = houseConfig;
  const { maxStayDate } = bookingConfig;

  const resvContext: IResvContext = {
    roomSelectInfo,
    houseData,
    setRoomSelectInfo,
    bookerInfo,
    setBookerInfo,
    from,
    to,
    step,
    setStep,
    payInfo,
    setPayInfo,
    customMsgs,
    totalPrice: selectedPrice,
  };

  const sharedSectionTitleProp: any = {
    weight: 600,
    mb: "normal",
  };

  useEffect(() => {
    memoRizeSelectInfo(from, to, payInfo, bookerInfo, step, roomSelectInfo);
  }, [from, to, payInfo, bookerInfo, roomSelectInfo]);

  if (step === "select")
    return (
      <div>
        <JDalign grid>
          <JDalign
            col={{
              full: 8,
              md: 12,
            }}
          >
            <div>
              <JDtypho {...sharedSectionTitleProp}>
                {LANG("date_select")}
              </JDtypho>
              <DateSelecter
                handleDateClick={() => {
                  dayPickerModalHook.openModal();
                }}
                dayPickerHook={dayPickerHook}
              />
              <JDalign
                flex={{
                  between: true,
                }}
              >
                <JDtypho {...sharedSectionTitleProp}>
                  {LANG("product_select")}
                </JDtypho>
                <JDradioButton
                  className="Reservation__roomFilterBtn"
                  btnProps={{
                    size: "small",
                    mode: "border",
                  }}
                  mode="gather"
                  withAllTooglerLabel="All"
                  withAllToogler
                  {...radioButtonHook}
                />
              </JDalign>
              {roomTypes?.map((RT) => {
                return (
                  <RoomTypeWrap
                    resvContext={resvContext}
                    dateInfo={{
                      checkIn: from || new Date(),
                      checkOut: to || new Date(),
                    }}
                    houseData={houseData}
                    roomType={RT}
                    key={RT._id}
                  />
                );
              })}
            </div>
            <JDdayPickerModal
              autoClose
              callBackChangeDate={() => {}}
              modalHook={dayPickerModalHook}
              {...dayPickerHook}
            />
          </JDalign>
          <JDalign
            col={{
              full: 4,
              md: 12,
            }}
          >
            <JDtypho mb="normal" weight={600}>
              {LANG("check_select")}
            </JDtypho>
            <SelectViewer resvContext={resvContext} />
          </JDalign>
        </JDalign>
      </div>
    );

  if (step === "input") {
    return (
      <JDalign grid>
        <JDalign
          col={{
            full: 8,
            lg: 12,
          }}
        >
          <JDbutton
            size="long"
            label={LANG("go_back")}
            onClick={() => {
              setStep("select");
            }}
          />
          <JDtypho {...sharedSectionTitleProp}>{LANG("bookerInfo")}</JDtypho>
          <BookerForm resvContext={resvContext} />
          <JDtypho {...sharedSectionTitleProp}>{LANG("pay_form")}</JDtypho>
          <PayForm resvContext={resvContext} />
          <JDalign mb="huge">
            <AgreeBlock resvContext={resvContext} type="use" />
            <AgreeBlock resvContext={resvContext} type="personal" />
          </JDalign>
        </JDalign>
        <JDalign
          col={{
            full: 4,
            lg: 12,
          }}
        >
          <JDtypho {...sharedSectionTitleProp}>{LANG("check_select")}</JDtypho>
          <PrevSelectViewer resvContext={resvContext} />
        </JDalign>
        <JDalign
          col={{
            full: 8,
            lg: 12,
          }}
        >
          <JDbutton
            onClick={handleDoResvBtn}
            size="longLarge"
            thema="primary"
            label={LANG("do_resv")}
          />
        </JDalign>
        {customMsgs.ResvCautionMsg && (
          <JDtypho size="small" weight={600}>
            {"*" + customMsgs.ResvCautionMsg}
          </JDtypho>
        )}
      </JDalign>
    );
  }

  throw Error("step is not Right");
};

export default Reservation;
