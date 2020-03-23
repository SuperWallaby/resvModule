import React from "react";
import { useQuery, useMutation } from "react-apollo";
import {
  getHouseForPublic,
  startBookingForPublic,
  startBookingForPublicVariables
} from "../types/api";
import {
  GET_HOUSE_FOR_PUBLIC,
  START_BOOKING_FOR_PUBLIC
} from "../apollo/queries";
import client from "../apollo/apolloClient";
import { utills } from "@janda-com/front";
import { LANG } from "../App";
import Reservation from "./Reservation";

const { queryDataFormater, onCompletedMessage } = utills;

interface IProps {
  publickey: string;
}

const ReservationWrap: React.FC<IProps> = ({ publickey }) => {
  // 스타트부킹(게스트)
  const { data, loading } = useQuery<getHouseForPublic>(GET_HOUSE_FOR_PUBLIC, {
    client,
    skip: publickey === undefined
  });

  const houseData =
    queryDataFormater(data, "GetHouseForPublic", "house", undefined) ||
    undefined;

  const [
    startBookingForPublicMu,
    { loading: startBookingLoading }
  ] = useMutation<startBookingForPublic, startBookingForPublicVariables>(
    START_BOOKING_FOR_PUBLIC,
    {
      client,
      onCompleted: ({ StartBookingForPublic }) => {
        onCompletedMessage(
          StartBookingForPublic,
          LANG("COMPLETE"),
          LANG("FAIL")
        );
      }
    }
  );

  const startBookingFn = (param: startBookingForPublicVariables) => {
    startBookingForPublicMu({
      variables: param
    });
  };

  if (loading) return <div />;
  if (!houseData) return <div>err</div>;

  return <Reservation houseData={houseData} startBookingFn={startBookingFn} />;
};

export default ReservationWrap;
