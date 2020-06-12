import React, { useState, useEffect } from "react";
import DateSelecter from "../components/DateSelecter";
import {
  useDayPicker,
  useModal,
  JDradioButton,
  JDalign,
  JDdayPickerModal,
  JDtypho,
  JDbutton,
  arraySum,
  useRadioButton,
} from "@janda-com/front";
import SelectViewer from "../components/SelectViewer";
import {
  makeBookingForPublicVariables,
  getHouseForPublic_GetHouseForPublic_house,
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
import PayForm from "../components/roomType/payForm/PayForm";
import PrevSelectViewer from "../components/PrevSelectViewer";
import AgreeBlock from "../components/AgreeBlock";
import { PayMethod, PricingType, Funnels } from "../types/enum";
import { Tstep, TOptionsObj } from "../types/type";
import {
  loadMemo,
  memoRizeSelectInfo,
  getUniqTag,
  bookingValidater,
  getUrlInformation,
} from "./helper";
import { store } from "./helper";

interface IProps {
  makeBookingFn: (param: makeBookingForPublicVariables) => void;
  houseData: getHouseForPublic_GetHouseForPublic_house;
  customMsgs: TOptionsObj;
}

const {
  urlDateFrom,
  haveUrlProductName,
  urlDateTo,
  urlTagNames,
  urlRoomTypeName,
} = getUrlInformation();

if (urlDateFrom) {
  store.isAsked = true;
}

const Reservation: React.FC<IProps> = ({
  houseData,
  makeBookingFn,
  customMsgs,
}) => {
  if (!houseData) throw Error("House date is not exsist");
  const { roomTypes, houseConfig } = houseData;
  const { bookingConfig } = houseConfig;
  const { maxStayDate } = bookingConfig;
  const dayPickerModalHook = useModal(false);
  // TODO 여기서 sameDate일경우에
  const dayPickerHook = useDayPicker(
    urlDateFrom || loadMemo("from"),
    urlDateTo || loadMemo("to")
  );
  const [payInfo, setPayInfo] = useState<IPayInfo>(loadMemo("payInfo"));
  const uniqTags = getUniqTag(roomTypes || []);
  const allTags = uniqTags.map((t) => t.value);

  const radioButtonHook = useRadioButton(urlTagNames || allTags, uniqTags);

  const noTags = uniqTags.length === 0;
  const targetProductModal = haveUrlProductName;

  const urlSearchedRoomType = roomTypes?.find(
    (r) => r.name === urlRoomTypeName
  );

  const urlRoomSelectInfo: IRoomSelectInfo[] = [
    {
      count: {
        female: 0,
        male: 0,
        roomCount: 0,
      },
      price: 0,
      pricingType: urlSearchedRoomType?.pricingType || PricingType.DOMITORY,
      roomTypeId: urlSearchedRoomType?._id || "",
      img: urlSearchedRoomType?.images?.[0] || "",
      roomTypeName: urlSearchedRoomType?.name || "",
    },
  ];

  const [bookerInfo, setBookerInfo] = useState<IBookerInfo>(
    loadMemo("bookerInfo")
  );
  const [step, setStep] = useState<Tstep>(loadMemo("step"));
  const [roomSelectInfo, setRoomSelectInfo] = useState<IRoomSelectInfo[]>(
    urlRoomSelectInfo || loadMemo("roomSelectInfo")
  );
  const selectedPrice = arraySum(roomSelectInfo.map((rs) => rs.price));

  const handleDoResvBtn = () => {
    if (bookingValidater(bookerInfo, payInfo)) {
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

  const visibleRoomTypes = (roomTypes || []).filter((RT) => {
    const allVisible =
      radioButtonHook.selectedValues.length === uniqTags.length;
    let visible = allVisible || noTags;
    RT.hashTags.forEach((tag) => {
      if (!visible) visible = radioButtonHook.selectedValues.includes(tag);
    });

    return visible;
  });

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
                {!noTags && (
                  <JDradioButton
                    className="Reservation__roomFilterBtn"
                    btnProps={{
                      size: "small",
                      mode: "border",
                    }}
                    withAllToogler
                    withAllTooglerLabel="전체"
                    mode="gather"
                    only
                    {...radioButtonHook}
                  />
                )}
              </JDalign>
              {visibleRoomTypes?.map((RT) => {
                const { name, _id } = RT;
                return (
                  <RoomTypeWrap
                    urlSearched={name === urlRoomTypeName}
                    resvContext={resvContext}
                    dateInfo={{
                      checkIn: from || new Date(),
                      checkOut: to || new Date(),
                    }}
                    houseData={houseData}
                    roomType={RT}
                    key={_id}
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
