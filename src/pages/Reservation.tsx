import React, { useState } from "react";
import DateSelecter from "../components/DateSelecter";
import {
  useDayPicker,
  JDdayPicker,
  useModal,
  JDalign,
  JDdayPickerModal,
  JDtypho
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

export interface IResvContext {
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  selectedRoom: string[];
  setSelectedRoom: React.Dispatch<React.SetStateAction<string[]>>;
  from: Date | null;
  to: Date | null;
}

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

  const [price, setPrice] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<string[]>([]);
  const { from, to } = dayPickerHook;
  const { roomTypes } = houseData;

  const resvContext: IResvContext = {
    price,
    setPrice,
    selectedRoom,
    setSelectedRoom,
    from,
    to
  };

  return (
    <div>
      <JDalign grid>
        <JDalign
          col={{
            full: 8
          }}
        >
          <div>
            <JDtypho weight={600} mb="small">
              {LANG("date_select")}
            </JDtypho>
            <DateSelecter
              handleDateClick={() => {
                dayPickerModalHook.openModal();
              }}
              dayPickerHook={dayPickerHook}
            />
            <JDtypho weight={600} mb="small">
              {LANG("product_select")}
            </JDtypho>
            {roomTypes?.map(RT => (
              <RoomTypeWrap
                resvContext={resvContext}
                setSelectedRoom={setSelectedRoom}
                selectedRoom={selectedRoom}
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
          <JDdayPickerModal modalHook={dayPickerModalHook} {...dayPickerHook} />
        </JDalign>
        <JDalign
          col={{
            full: 4
          }}
        >
          <SelectViewer />
        </JDalign>
      </JDalign>
    </div>
  );
};

export default Reservation;
