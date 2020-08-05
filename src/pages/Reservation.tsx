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
  useDropDown,
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
import isMobile from "is-mobile";
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
import moment from "moment";
import { validation } from "../components/helper";
import { JDdropDown, isEmpty,utils } from "@janda-com/front";
import AgreePolicyModal from "../components/AgreePoilicyModal";
import ReactGA from "react-ga";
const { parentScrollMove } = utils;
interface IProps {
  makeBookingFn: (param: makeBookingForPublicVariables) => void;
  houseData: getHouseForPublic_GetHouseForPublic_house;
  customMsgs: TOptionsObj;
}

export const {
  urlDateFrom,
  haveUrlProduct,
  urlDateTo,
  urlTagNames,
  urlProductIndex,
  urlRoomTypeName,
  urlRoomTypeCode
} = getUrlInformation();

if (urlDateFrom) {
  store.isAsked = true;
}


let FV_FLAG = false;

const Reservation: React.FC<IProps> = ({
  houseData,
  makeBookingFn,
  customMsgs,
}) => {
  if (!houseData) throw Error("House date is not exsist");
  const dropDownHook = useDropDown(true);
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

  let urlSearchedRoomType = roomTypes?.find((r) => r.name === urlRoomTypeName);

  if (!urlSearchedRoomType)
    urlSearchedRoomType = roomTypes?.find((r, i) => i + 1 === urlProductIndex);
  
  if(!urlSearchedRoomType)
    urlSearchedRoomType = roomTypes?.find((r,i) => r.code === urlRoomTypeCode);

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
    urlSearchedRoomType ? urlRoomSelectInfo : loadMemo("roomSelectInfo")
  );

  const selectedPrice = arraySum(roomSelectInfo.map((rs) => rs.price));

  const { from, to } = dayPickerHook;

  const handleDoResvBtn = () => {

    ReactGA.event({
      category: 'Resv',
      action: 'Click Resv Btn'
    });


    if (bookingValidater(bookerInfo, payInfo)) {
      const { memo, hiddenMemo, name, password, phoneNumber } = bookerInfo;
      const {
        cardNum,
        expireM,
        expireY,
        idNum,
        password: cardPassword,
        paymethod,
        sender,
      } = payInfo;
      makeBookingFn({
        bookerParams: {
          agreePrivacyPolicy: true,
          memo: `${
            hiddenMemo ? `[${hiddenMemo}]` : ""
          }  ${ sender ? `["입금자:"${sender}] ${memo}` : ""}`,
          email: "crawl1234@nave.com",
          name: name,
          password: password,
          phoneNumber: phoneNumber,
          funnels: Funnels.HOMEPAGE,
        },
        optionalItemSubmit: roomSelectInfo.filter(rs => !isEmpty(rs.options)).map(rs => ({
          items:  (rs.options || []).map(op => ({
              itemId: op._id,
              count: op.count,
              price: op.price
            })),
          roomTypeId: rs.roomTypeId
        })),
        checkInOut: {
          checkIn: moment(dayPickerHook.from).add(9,"h").toDate(),
          checkOut: moment(dayPickerHook.from).add(9,"h").add(1, "d").toDate(),
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

  useEffect(() => {
    window.addEventListener("popstate", function (event) {
      if (!event.state?.data) setStep("select");
      if (event.state?.data === "input") setStep("input");
    });
  }, []);

  const handleStepChange = () => {
    if (validation(roomSelectInfo, from, to)) {

      ReactGA.event({
        action:"Select Items " + roomSelectInfo.map(rsi => rsi.roomTypeName).join(','),
        category:"Resv"});

      window.history.pushState({ data: "input" }, "예약자 정보입력");
      setStep("input");
    }
  };


  const ops = roomSelectInfo.map(rs => rs.options);
  const opPrices = ops.map(o => arraySum(o?.map(o => o.price || 0) || [0]));
  const totalOptionPrice = arraySum(opPrices);

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
    totalPrice: selectedPrice + totalOptionPrice,
    dayPickerHook,
    handleStepChange,
    totalOptionPrice
  };

  const sharedSectionTitleProp: any = {
    weight: 600,
    mb: "normal",
  };

  useEffect(() => {
    memoRizeSelectInfo(from, to, payInfo, bookerInfo, step, roomSelectInfo);
  }, [payInfo, bookerInfo, roomSelectInfo, step, from, to]);

  const visibleRoomTypes = (roomTypes || []).filter((RT) => {
    const allVisible =
      radioButtonHook.selectedValues.length === uniqTags.length;
    let visible = allVisible || noTags;
    RT.hashTags.forEach((tag) => {
      if (!visible) visible = radioButtonHook.selectedValues.includes(tag);
    });

    return visible;
  });

  const {name} = houseData;

  useEffect(()=>{
    if(step === "input")
      ReactGA.pageview(window.location.pathname + window.location.search + "/payment");
  },[step])

  useEffect(()=>{
    // 상위 모달의 스크롤을 top 0으로 맞춤
    parentScrollMove(document.getElementById("root")!,{
      top: 0,
    })

  },[step])

  if (step === "select")
    return (
      <div>
        <h1>{name}</h1>
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
                  if (roomSelectInfo.length > 0)
                    if (
                      !window.confirm(
                        "날짜를 변경하시면 선택 정보가 초기화 됩니다."
                      )
                    )
                      return;
                    else setRoomSelectInfo([]);

                  dayPickerModalHook.openModal();
                }}
                dayPickerHook={dayPickerHook}
              />
              <JDalign
                flex={{
                  between: true,
                }}
                style={{
                  flexWrap: "wrap",
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
                    handleDoResvBtn={handleStepChange}
                    urlSearched={_id == urlSearchedRoomType?._id}
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
              isRange={false}
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
        {isMobile() && (
          <JDdropDown
            mode={"floatBottom"}
            {...dropDownHook}
            isOpen={true}
            Buttons={() => {
              return [
                <JDbutton
                  onClick={handleStepChange}
                  thema="primary"
                  size="large"
                  key={"Asd"}
                  label="예약하기"
                />,
              ];
            }}
          />
        )}
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
            id="MobileGoBackBtn"
            iconProp={{
              icon: "arrowBack"
            }}
            mode="border"
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
          <PrevSelectViewer handleDoResvBtn={handleDoResvBtn} resvContext={resvContext} />
          {customMsgs.ResvCautionMsg && (
            <JDtypho mb="small" size="small">
              {"*" + customMsgs.ResvCautionMsg}
            </JDtypho>
          )}
        </JDalign>
         <JDalign
          col={{
            full: 8,
            lg: 12,
          }}
        >
        </JDalign>
      </JDalign>
    );
  }

  throw Error("step is not Right");
};

export default Reservation;
