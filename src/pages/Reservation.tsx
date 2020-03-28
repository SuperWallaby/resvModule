import React, { useState } from "react";
import DateSelecter from "../components/DateSelecter";
import {
  useDayPicker,
  JDdayPicker,
  useModal,
  JDalign,
  JDdayPickerModal,
  JDtypho,
  utills,
  JDbutton
} from "@janda-com/front";
import SelectViewer from "../components/SelectViewer";
import { useQuery } from "react-apollo";
import {
  startBookingForPublicVariables,
  getHouseForPublic_GetHouseForPublic_house
} from "../types/api";
import moment from "moment";
import RoomTypeWrap from "../components/roomType/RoomTypeWrap";
import { LANG } from "../App";
import {
  IRoomSelectInfo,
  IResvContext,
  IBookerInfo,
  IPayInfo
} from "./declare";
import BookerForm from "../components/roomType/bookerForm/BookerForm";
import { NGO_NUMS } from "../components/nationalcode";
import PayForm from "../components/roomType/payForm/PayForm";
import PrevSelectViewer from "../components/PrevSelectViewer";
import AgreeBlock from "../components/AgreeBlock";

const { arraySum } = utills;

const ngoSelectOp = NGO_NUMS.map(num => ({
  label: "+" + num,
  value: num
}));

interface IProps {
  startBookingFn: (param: startBookingForPublicVariables) => void;
  houseData: getHouseForPublic_GetHouseForPublic_house;
}

const Reservation: React.FC<IProps> = ({ houseData, startBookingFn }) => {
  const dayPickerModalHook = useModal(false);
  const dayPickerHook = useDayPicker(
    moment().toDate(),
    moment()
      .add(1, "day")
      .toDate()
  );

  const [payInfo, setPayInfo] = useState<IPayInfo>({
    paymethod: "",
    cardNum: "",
    password: "",
    expireM: "",
    expireY: "",
    idNum: ""
  });

  const [bookerInfo, setBookerInfo] = useState<IBookerInfo>({
    phoneNumber: "",
    name: "",
    password: "",
    memo: "",
    agreeUse: false,
    agreePersonal: false
  });
  const [step, setStep] = useState<"select" | "input" | "check">("input");
  const [roomSelectInfo, setRoomSelectInfo] = useState<IRoomSelectInfo[]>([]);
  const selectedPrice = arraySum(roomSelectInfo.map(rs => rs.price));

  const contactSelectOp = [
    {
      label: LANG("hand_phone"),
      value: "phone"
    },
    {
      label: LANG("else"),
      value: "else"
    }
  ];

  const { from, to } = dayPickerHook;
  const { roomTypes } = houseData;

  const resvContext: IResvContext = {
    roomSelectInfo,
    setRoomSelectInfo,
    bookerInfo,
    setBookerInfo,
    from,
    to,
    step,
    setStep,
    payInfo,
    setPayInfo,
    totalPrice: selectedPrice
  };

  const sharedSectionTitleProp: any = {
    weight: 600,
    mb: "normal"
  };

  if (step === "select")
    return (
      <div>
        <JDalign grid>
          <JDalign
            col={{
              full: 8,
              md: 12
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
              <JDtypho {...sharedSectionTitleProp}>
                {LANG("product_select")}
              </JDtypho>
              {roomTypes?.map(RT => (
                <RoomTypeWrap
                  resvContext={resvContext}
                  dateInfo={{
                    checkIn: from || new Date(),
                    checkOut: to || new Date()
                  }}
                  houseData={houseData}
                  roomType={RT}
                  key={RT._id}
                />
              ))}
            </div>
            <JDdayPickerModal
              modalHook={dayPickerModalHook}
              {...dayPickerHook}
            />
          </JDalign>
          <JDalign
            col={{
              full: 4,
              md: 12
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
            lg: 12
          }}
        >
          <JDtypho {...sharedSectionTitleProp}>{LANG("bookerInfo")}</JDtypho>
          <BookerForm resvContext={resvContext} />
          <JDtypho {...sharedSectionTitleProp}>{LANG("bookerInfo")}</JDtypho>
          <PayForm resvContext={resvContext} />

          <JDalign mb="huge">
            <AgreeBlock resvContext={resvContext} type="use" />
            <AgreeBlock resvContext={resvContext} type="personal" />
          </JDalign>
        </JDalign>
        <JDalign
          col={{
            full: 4,
            lg: 12
          }}
        >
          <JDtypho {...sharedSectionTitleProp}>{` -`}</JDtypho>
          <PrevSelectViewer resvContext={resvContext} />
        </JDalign>
        <JDalign
          col={{
            full: 8,
            lg: 12
          }}
        >
          <JDbutton size="longLarge" thema="primary" label={LANG("do_resv")} />
        </JDalign>
      </JDalign>
    );
  }
  return <div></div>;
};

export default Reservation;
