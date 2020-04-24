import React, { useState, useMemo } from "react";
import {
  JDselect,
  JDbutton,
  JDcolumn,
  JDtable,
  InputText,
  JDcontainer,
  utills,
  JDtypho,
} from "@janda-com/front";
import client from "../apollo/apolloClient";
import {
  getBookingForPublic,
  getBookingForPublicVariables,
  getBookingForPublic_GetBookingForPublic_booking as IBooking,
} from "../types/api";
import { GET_BOOKING_FOR_PUBLIC } from "../apollo/queries";

const { queryDataFormater } = utills;

export interface IProps {}

type TQueryData = {
  name: string;
  bookingNum: string;
};

export const ResvFinder: React.FC<IProps> = () => {
  const [queryData, setQueryData] = useState<TQueryData>({
    bookingNum: "",
    name: "",
  });
  const { bookingNum, name } = queryData;
  const [data, setData] = useState<IBooking>();

  const tableData = data
    ? [
        {
          ...data,
        },
      ]
    : [];

  const tableColumn: JDcolumn<IBooking>[] = useMemo(
    (): JDcolumn<IBooking>[] => [
      {
        accessor: "checkIn",
        Cell: ({ original }) => {
          return original.checkIn + original.checkOut;
        },
        Header: () => (
          <div>
            <JDtypho size="small">숙박일자</JDtypho>
          </div>
        ),
      },
    ],
    []
  );

  function set<T extends keyof TQueryData>(key: T, value: TQueryData[T]) {
    setQueryData({ ...queryData, [key]: value });
  }

  return (
    <JDcontainer>
      <div>
        <InputText
          onChange={(v: any) => {
            set("name", v);
          }}
          value={queryData.name}
        />
      </div>
      <div>
        <InputText
          onChange={(v: any) => {
            set("bookingNum", v);
          }}
          value={queryData.bookingNum}
        />
      </div>
      <div></div>
      <div />
      <div>
        <JDbutton
          onClick={async () => {
            const {
              data: result,
              loading,
              networkStatus,
              stale,
              errors,
            } = await client.query<
              getBookingForPublic,
              getBookingForPublicVariables
            >({
              query: GET_BOOKING_FOR_PUBLIC,
              variables: {
                param: {
                  bookingNum,
                  name,
                },
                skip: true,
              },
            });
            const data =
              queryDataFormater(
                result,
                "GetBookingForPublic",
                "booking",
                undefined
              ) || undefined;
            if (data) {
              setData(data);
            }
          }}
        />
      </div>
    </JDcontainer>
  );
};

export default ResvFinder;
