import React from "react";
import {
  JDbutton,
  JDtypho,
  JDalign,
  isEmpty,
  arraySum,
  autoComma,
  dateRangeFormat,
  toast,
} from "@janda-com/front";
import { LANG } from "../App";
import { IResvContext } from "../pages/declare";
import { PricingType } from "../types/enum";
import { validation } from "./helper";

interface IProps {
  resvContext: IResvContext;
}

const SelectViewer: React.FC<IProps> = ({ resvContext }) => {
  const {
    roomSelectInfo,
    from,
    to,
    totalPrice,
    handleStepChange,
  } = resvContext;

  const sharedBtnProp: any = {
    onClick: () => {
      handleStepChange();
    },
    mb: "no",
    size: "longLarge",
    thema: "primary",
  };

  if (!to || !from) {
    return (
      <div className="selectViewer">
        <JDtypho mb="no" size="h6">
          {LANG("date_un_selected")}
        </JDtypho>
        <div>
          <JDbutton
            {...sharedBtnProp}
            label={LANG("do_reservation")}
            mb="no"
            size="longLarge"
            thema="primary"
          />
        </div>
      </div>
    );
  }

  const unSelected = isEmpty(roomSelectInfo);
  if (unSelected) {
    return (
      <div className="selectViewer">
        <JDtypho mb="no" size="h6">
          {LANG("un_selected")}
        </JDtypho>
        <div>
          <JDbutton
            {...sharedBtnProp}
            label={LANG("do_reservation")}
            mb="no"
            size="longLarge"
            thema="primary"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="selectViewer">
      <div className="selectViewer__header">
        {roomSelectInfo.map((RI) => {
          const { pricingType, count, price } = RI;
          const isDomitory = pricingType === PricingType.DOMITORY;
          const { female, male, roomCount } = count;
          return (
            <div
              className="selectViewer__headerCell"
              key={RI.roomTypeId + "view"}
            >
              <JDtypho mb="small" size="h6" weight={600}>
                {RI.roomTypeName}
              </JDtypho>
              <JDtypho weight={300}>
                {LANG("date")} : {dateRangeFormat(from, to)}
              </JDtypho>
              <JDtypho mb="no" weight={300}>
                {LANG(isDomitory ? "people" : "room_count")} :{" "}
                {isDomitory
                  ? LANG("female") + female + " " + LANG("male") + male
                  : roomCount + LANG("count")}
              </JDtypho>
            </div>
          );
        })}
      </div>
      <div className="selectViewer__calculater">
        <div className="selectViewer__calculaterBody">
          <JDalign
            mb="small"
            flex={{
              between: true,
            }}
          >
            <JDtypho>{LANG("select_product")}</JDtypho>
            <JDtypho weight={600}>{autoComma(totalPrice)} KRW</JDtypho>
          </JDalign>

          <JDalign
            mb="small"
            flex={{
              between: true,
            }}
          >
            <JDtypho>{LANG("option")}</JDtypho>
            <JDtypho weight={600}>0 KRW</JDtypho>
          </JDalign>

          <JDalign
            mb="small"
            flex={{
              between: true,
            }}
          >
            <JDtypho>{LANG("addition_tax")}</JDtypho>
            <JDtypho weight={600}>0 KRW</JDtypho>
          </JDalign>
        </div>
        <div className="selectViewer__calculaterTotal">
          <JDalign
            mb="small"
            flex={{
              between: true,
            }}
          >
            <JDtypho>{LANG("total_price")}</JDtypho>
            <JDtypho size="h6" mb="no" weight={600}>
              {autoComma(totalPrice)} KRW
            </JDtypho>
          </JDalign>
        </div>
        <JDbutton {...sharedBtnProp} label={LANG("do_reservation")} />
      </div>
    </div>
  );
};

export default SelectViewer;
