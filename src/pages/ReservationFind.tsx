import React, { useState } from "react";
import {
  JDbutton,
  InputText,
  JDcontainer,
  useInput,
  JDalign,
  JDtypho,
  WindowSize,
} from "@janda-com/front";
import client from "../apollo/apolloClient";
import {
  getBookingForPublic_GetBookingForPublic_booking as IBooking,
  searchBooking,
  searchBookingVariables,
} from "../types/api";
import { SEARCH_BOOKING } from "../apollo/queries";
import { onCompletedMessage } from "@janda-com/front";
import { LANG } from "../App";
import { InfoRender } from "../atom/InfoRender";
import { dateRangeFormat } from "@janda-com/front";
import { getRoomSelectInfo } from "../utils/typeChanger";
import moment from "moment";
import { autoComma } from "@janda-com/front";

export interface IProps {
  callBackGoToBook: () => void;
}

export const ResvFinder: React.FC<IProps> = ({ callBackGoToBook }) => {
  const bookingNumHook = useInput(localStorage.getItem("jdbn") || "");
  const [data, setData] = useState<IBooking>();

  const handleNumSearch = async (bn: string) => {
    const result = await client.query<searchBooking, searchBookingVariables>({
      query: SEARCH_BOOKING,
      variables: {
        bookingNum: bn,
      },
    });
    const { SearchBooking } = result.data;
    onCompletedMessage(
      SearchBooking,
      LANG("reference_success"),
      LANG("reference_fail")
    );
    const { data } = SearchBooking;

    if (data) setData(data);
  };

  const InfoTable = () => {
    if (!data) return <span />;
    const {
      name,
      checkIn,
      checkOut,
      roomTypes,
      memo,
      payment,
      createdAt,
      guests,
    } = data;
    if (!roomTypes) return <span />;

    const { totalPrice, status, payMethod } = payment;

    const roomSelectInfo = getRoomSelectInfo(guests, roomTypes);

    return (
      <div className="searchResult">
        <div className="searchResult__header">
          <JDtypho size="h6">{name}</JDtypho>
          <JDtypho weight={300}>
            {LANG("date")} : {dateRangeFormat(checkIn, checkOut)}
          </JDtypho>
        </div>
        <div className="searchResult__body">
          {roomSelectInfo.map((ri) => {
            const { count } = ri;
            const { female, male, roomCount } = count;
            return (
              <InfoRender
                wrapProp={{
                  className: "searchResult__cell",
                }}
                label={ri.roomTypeName || ""}
                value={LANG("total_get")(male, female, roomCount)}
              />
            );
          })}
          <InfoRender
            wrapProp={{
              className: "searchResult__cell",
            }}
            label={LANG("createdAt")}
            value={moment(createdAt).format("YYYY-MM-DD HH:mm")}
          />
          <InfoRender
            wrapProp={{
              className: "searchResult__cell",
            }}
            label={LANG("total_price")}
            value={autoComma(totalPrice) + " KRW"}
          />
          <InfoRender
            wrapProp={{
              className: "searchResult__cell",
            }}
            label={LANG("paymentStatus")}
            value={LANG("PaymentStatus", status)}
          />
          <InfoRender
            wrapProp={{
              className: "searchResult__cell",
            }}
            label={LANG("payMethod")}
            value={LANG("PayMethod", payMethod)}
          />
        </div>
      </div>
    );
  };

  return (
    <JDcontainer className="resvFind" size={WindowSize.sm}>
      <JDalign mb="largest">
        <InputText
          className="resvFind__bnFrom"
          Size="big"
          placeholder={LANG("bookingNumber")}
          label={LANG("bookingNumber")}
          mb="large"
          {...bookingNumHook}
        />
      </JDalign>
      <JDtypho></JDtypho>
      <div>
        <JDbutton
          thema="primary"
          onClick={() => {
            handleNumSearch(bookingNumHook.value);
          }}
          size="longLarge"
          label={LANG("reservation_lookup")}
        />
      </div>
      <div className="resvFind__tableWrap">
        <InfoTable />
      </div>
      <JDbutton
        iconProp={{
          icon: "arrowBack",
        }}
        label={LANG("goto_booking_page")}
        onClick={() => callBackGoToBook()}
      />
    </JDcontainer>
  );
};

export default ResvFinder;
