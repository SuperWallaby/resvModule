import React from "react";
import {
  JDphotoFrame,
  JDslider,
  JDslide,
  JDtypho,
  JDalign,
  fromToRender,
  autoComma,
} from "@janda-com/front";
import { LANG } from "../App";
import { IResvContext } from "../pages/declare";

interface IProps {
  resvContext: IResvContext;
}

const PrevSelectViewer: React.FC<IProps> = ({ resvContext }) => {
  const { totalPrice, roomSelectInfo, from, setStep, to } = resvContext;
  let totalWoman = 0;
  let totalMale = 0;
  let totalRoom = 0;

  let totalOptionString = "";

  const imgs: string[] = [];
  roomSelectInfo.forEach((rsi) => {
    totalWoman += rsi.count.female;
    totalMale += rsi.count.male;
    totalRoom += rsi.count.roomCount;
    if (rsi.img) imgs.push(rsi.img);
  });

  const optionalSelectInfo = roomSelectInfo.map(rsi => ({
    roomTypeName: rsi.roomTypeName,
    optString: rsi.options?.map((op)=> op.label + ": " + op.count).join(",")
  }))

  return (
    <div className="prevSelectViewer">
      <div>
        <JDslider dots={false} mr="no" mb="no" displayArrow={false}>
          {imgs.map((img) => (
            <JDslide>
              <JDphotoFrame
                mr="no"
                src={img}
                isBgImg
                unStyle
                style={{
                  borderRadius: 0,
                  height: "30rem",
                }}
              />
            </JDslide>
          ))}
        </JDslider>
        <JDalign
          className="prevSelectViewer__line"
          flex={{
            between: true,
          }}
        >
          <JDtypho weight={600}>{LANG("product")}</JDtypho>
          <JDtypho>
            {roomSelectInfo.map((rsi) => rsi.roomTypeName).join(" | ")}
          </JDtypho>
        </JDalign>
        <JDalign
          className="prevSelectViewer__line"
          flex={{
            between: true,
          }}
        >
          <JDtypho weight={600}>{LANG("date")}</JDtypho>
          <JDtypho>{fromToRender(from, to)}</JDtypho>
        </JDalign>
        <JDalign
          className="prevSelectViewer__line"
          flex={{
            between: true,
          }}
        >
          <JDtypho weight={600}>{LANG("people")}</JDtypho>
          <JDtypho>
            {LANG("total_get")(totalMale, totalWoman, totalRoom)}
          </JDtypho>
        </JDalign>
        <JDalign
          className="prevSelectViewer__line"
          flex={{
            between: true,
          }}
        >
          <JDtypho weight={600}>{LANG("option")}</JDtypho>
          <JDtypho />{optionalSelectInfo.map(osi => <div>
            {osi.roomTypeName + " - " +(osi.optString || "")}
          </div>)}
        </JDalign>
      </div>
      <JDalign mb="small" className="prevSelectViewer__totalPrice">
        {autoComma(totalPrice)} KRW
      </JDalign>
    </div>
  );
};

export default React.memo(
  PrevSelectViewer,
  ({ resvContext }, { resvContext: resvContext2 }) =>
    resvContext.roomSelectInfo === resvContext2.roomSelectInfo
);
