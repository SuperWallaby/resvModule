import React from "react";
import { JDphotoFrame } from "@janda-com/front";
import { JDtypho, JDalign } from "@janda-com/front";
import { LANG } from "../App";
import "./PrevSelectViewer.scss";
import { IResvContext } from "../pages/declare";

interface IProps {
  resvContext: IResvContext;
}

const PrevSelectViewer: React.FC<IProps> = ({ resvContext }) => {
  const { totalPrice } = resvContext;
  return (
    <div className="prevSelectViewer">
      <div>
        <JDphotoFrame />
        <JDalign
          className="prevSelectViewer__line"
          flex={{
            between: true
          }}
        >
          <JDtypho weight={600}>{LANG("product")}</JDtypho>
          <JDtypho> </JDtypho>
        </JDalign>
        <JDalign
          className="prevSelectViewer__line"
          flex={{
            between: true
          }}
        >
          <JDtypho weight={600}>{LANG("product")}</JDtypho>
          <JDtypho> </JDtypho>
        </JDalign>
        <JDalign
          className="prevSelectViewer__line"
          flex={{
            between: true
          }}
        >
          <JDtypho weight={600}>{LANG("product")}</JDtypho>
          <JDtypho> </JDtypho>
        </JDalign>
        <JDalign
          className="prevSelectViewer__line"
          flex={{
            between: true
          }}
        >
          <JDtypho weight={600}>{LANG("product")}</JDtypho>
          <JDtypho> </JDtypho>
        </JDalign>
      </div>
      <div className="prevSelectViewer__totalPrice">{totalPrice} KRW</div>
    </div>
  );
};

export default PrevSelectViewer;
