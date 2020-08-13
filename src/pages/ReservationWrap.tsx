import React, { Fragment } from "react";
import { useQuery, useMutation } from "react-apollo";
import {
  getHouseForPublic,
  makeBookingForPublic,
  makeBookingForPublicVariables,
  getHouseForPublic_GetHouseForPublic_house,
} from "../types/api";
import {
  GET_HOUSE_FOR_PUBLIC,
  MAKE_BOOKING_FOR_PUBLIC,
} from "../apollo/queries";
import client from "../apollo/apolloClient";
import {
  queryDataFormater,
  onCompletedMessage,
  useModal,
  JDmodal,
  JDbutton,
  copytoClipboard,
  JDalign,
  getFromUrl,
  JDlabel,
  toast,
} from "@janda-com/front";
import { LANG } from "../App";
import Reservation from "./Reservation";
import { removeAllSaveInfo, getOptionsObj } from "./helper";
import { InputText } from "@janda-com/front";
import ReactGA from "react-ga";

interface IProps {
  publickey: string;
  finishCallBack?: () => void;
  sideShoudStatic?: boolean;
  houseData?: getHouseForPublic_GetHouseForPublic_house;
  loading?: boolean;
}

const ReservationWrap: React.FC<IProps> = ({ publickey, loading, houseData, finishCallBack, sideShoudStatic }) => {
  const confirmModal = useModal();


  const [makeBookingForPublicMu, { loading: makeBookingLoading }] = useMutation<
    makeBookingForPublic,
    makeBookingForPublicVariables
  >(MAKE_BOOKING_FOR_PUBLIC, {
    client,
    onError: (e) => {
      ReactGA.exception({
        description: 'makeBookingForPublicMu Error Occur',
        fatal: true
      });
    },
    onCompleted: ({ MakeBookingForPublic }) => {
      
      onCompletedMessage(MakeBookingForPublic, LANG("COMPLETE"), LANG("FAIL"));
      const bookingNum = MakeBookingForPublic.booking?.bookingNum || "";
      removeAllSaveInfo();
      localStorage.setItem("jdbn", bookingNum);
      if (MakeBookingForPublic.ok) {
        ReactGA.event({
          category: "Resv",
          action: "completed"
        });
        confirmModal.openModal({
          bookingNum,
        });
      }
    },
  });

  const makeBookingFn = (param: makeBookingForPublicVariables) => {
    makeBookingForPublicMu({
      variables: param,
    });
  };

  if (loading) return <div>loading</div>;
  if (!houseData) return <div>err</div>;

  const { houseConfig } = houseData;
  const { options: optArray } = houseConfig;
  const optObj = getOptionsObj(optArray);
  const { bookingNum } = confirmModal.info || {
    bookingNum: "",
  };


  return (
    <Fragment>
      <JDmodal
        head={{
          title: LANG("resv_complete_modal_view_title"),
        }}
        foot={
          <Fragment>
            <JDbutton
              onClick={() => {
                sessionStorage.clear();
                finishCallBack && finishCallBack();
              }}
              thema="primary"
              mode="flat"
              label={LANG("confirm")}
            />
            <JDbutton
              onClick={() => {
                confirmModal.closeModal();
              }}
              mode="flat"
              label={LANG("close")}
            />
          </Fragment>
        }
        {...confirmModal}
        loading={makeBookingLoading}
      >
        {
          <span>
            <JDlabel txt={LANG("bookingNumber")} />
            <InputText
              mb="largest"
              iconProps={{
                size: "large",
              }}
              mr="no"
              Size="big"
              value={bookingNum}
              iconHover
              iconOnClick={() => {
                copytoClipboard(bookingNum);
                toast("클립보드에 복사 되었습니다.");
              }}
              icon="file"
            />
            <JDalign mb="small">{LANG("move_to_confirm_page")}</JDalign>
            {optObj.ResvCompeleteMsg && (
              <InputText
                label={LANG("complete_msg")}
                textarea
                readOnly
                value={optObj.ResvCompeleteMsg}
              />
            )}
          </span>
        }
      </JDmodal>
      <Reservation
        customMsgs={optObj}
        houseData={houseData}
        makeBookingFn={makeBookingFn}
      />
    </Fragment>
  );
};

export default ReservationWrap;
