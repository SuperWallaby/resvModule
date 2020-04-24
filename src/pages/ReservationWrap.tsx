import React, { Fragment } from "react";
import { useQuery, useMutation } from "react-apollo";
import {
  getHouseForPublic,
  makeBookingForPublic,
  makeBookingForPublicVariables,
} from "../types/api";
import {
  GET_HOUSE_FOR_PUBLIC,
  MAKE_BOOKING_FOR_PUBLIC,
} from "../apollo/queries";
import client from "../apollo/apolloClient";
import { utills, useModal, JDmodal, JDbutton, JDtypho } from "@janda-com/front";
import { LANG } from "../App";
import Reservation from "./Reservation";
import { Link } from "react-router-dom";

const { queryDataFormater, onCompletedMessage } = utills;

interface IProps {
  publickey: string;
}

const ReservationWrap: React.FC<IProps> = ({ publickey }) => {
  // 스타트부킹(게스트)
  const { data, loading } = useQuery<getHouseForPublic>(GET_HOUSE_FOR_PUBLIC, {
    client,
    skip: publickey === undefined,
  });
  const confirmModal = useModal();

  const houseData =
    queryDataFormater(data, "GetHouseForPublic", "house", undefined) ||
    undefined;

  const [makeBookingForPublicMu, { loading: makeBookingLoading }] = useMutation<
    makeBookingForPublic,
    makeBookingForPublicVariables
  >(MAKE_BOOKING_FOR_PUBLIC, {
    client,
    onCompleted: ({ MakeBookingForPublic }) => {
      onCompletedMessage(MakeBookingForPublic, LANG("COMPLETE"), LANG("FAIL"));
      if (MakeBookingForPublic.ok) confirmModal.openModal();
    },
  });

  const makeBookingFn = (param: makeBookingForPublicVariables) => {
    makeBookingForPublicMu({
      variables: param,
    });
  };

  if (loading) return <div />;
  if (!houseData) return <div>err</div>;

  return (
    <Fragment>
      <JDmodal
        foot={
          <Fragment>
            <JDbutton
              onClick={() => {
                sessionStorage.clear();
                window.location.reload();
              }}
              thema="primary"
              mode="flat"
              label="확인"
            />
            <JDbutton
              onClick={() => {
                confirmModal.closeModal();
              }}
              mode="flat"
              label="닫기"
            />
          </Fragment>
        }
        {...confirmModal}
        loading={makeBookingLoading}
      >
        {
          <span>
            <JDtypho mb="small" size="h6" weight={600}>
              예약이 완료되었습니다.
            </JDtypho>
            예약 확인 페이지에서 확인 가능합니다.
          </span>
        }
      </JDmodal>
      <Reservation houseData={houseData} makeBookingFn={makeBookingFn} />
    </Fragment>
  );
};

export default ReservationWrap;
