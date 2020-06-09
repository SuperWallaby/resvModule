import React from "react";
import CheckBoxMini from "../atom/CheckBox";
import { IResvContext } from "../pages/declare";
import { JDtypho, JDalign } from "@janda-com/front";
import { LANG } from "../App";

interface IProps {
  type: "use" | "personal";
  resvContext: IResvContext;
}

const AgreeBlock: React.FC<IProps> = ({ type, resvContext }) => {
  const { bookerInfo, setBookerInfo } = resvContext;

  const { agreePersonal, agreeUse } = bookerInfo;

  const isPersonalType = type === "personal";

  const handleClick = () => {
    if (!isPersonalType) {
      bookerInfo.agreeUse = !bookerInfo.agreeUse;
    } else {
      bookerInfo.agreePersonal = !bookerInfo.agreePersonal;
    }

    setBookerInfo({
      ...bookerInfo
    });
  };

  return (
    <JDalign
      flex={{
        vCenter: true
      }}
      mb="normal"
      className="agreeBlock"
    >
      <CheckBoxMini
        checked={isPersonalType ? agreePersonal : agreeUse}
        handleClick={handleClick}
      />
      <JDtypho weight={600}>
        {isPersonalType ? (
          <JDalign flex>
            <JDtypho mr="tiny" color="error">
              {LANG("must")}
            </JDtypho>
            <JDtypho>{LANG("use_policy")}</JDtypho>
          </JDalign>
        ) : (
            <JDalign flex>
              <JDtypho color="error" mr="tiny">
                {LANG("must")}
              </JDtypho>
              {LANG("personal_use_agree")}
            </JDalign>
          )}
      </JDtypho>
    </JDalign>
  );
};

export default AgreeBlock;
