import React from "react";
import CheckBoxMini from "../atom/CheckBox";
import { IResvContext } from "../pages/declare";
import { JDtypho, JDalign, JDbutton, useModal } from "@janda-com/front";
import { LANG } from "../App";
import AgreePolicyModal from "./AgreePoilicyModal";

interface IProps {
  type: "use" | "personal";
  resvContext: IResvContext;
}

const AgreeBlock: React.FC<IProps> = ({ type, resvContext }) => {
  const { bookerInfo, setBookerInfo } = resvContext;
  const agreePolicyModalHook = useModal(false);

  const { agreePersonal, agreeUse } = bookerInfo;

  const isPersonalType = type === "personal";

  const handleClick = () => {
    if (!isPersonalType) {
      bookerInfo.agreeUse = !bookerInfo.agreeUse;
    } else {
      bookerInfo.agreePersonal = !bookerInfo.agreePersonal;
    }

    setBookerInfo({
      ...bookerInfo,
    });
  };

  return (
    <JDalign
      flex={{
        vCenter: true,
      }}
      mb="normal"
      className="agreeBlock"
    >
      <CheckBoxMini
        checked={isPersonalType ? agreePersonal : agreeUse}
        handleClick={handleClick}
      />
      <JDtypho
        style={{
          width: "100%",
        }}
        weight={600}
      >
        {isPersonalType ? (
          <JDalign
            flex={{
              vCenter: true,
              grow: true,
            }}
          >
            <JDalign
              flex={{
                vCenter: true,
              }}
            >
              <JDtypho mr="tiny" color="error">
                {LANG("must")}
              </JDtypho>
              <JDtypho>{LANG("use_policy")}</JDtypho>
            </JDalign>
            <JDbutton
              size="small"
              mode="border"
              onClick={() => {
                agreePolicyModalHook.openModal();
              }}
              mb="no"
              mr="no"
              label="약관보기"
            />
          </JDalign>
        ) : (
          <JDalign
            flex={{
              around: true,
              grow: true,
            }}
          >
            <JDalign
              flex={{
                vCenter: true,
              }}
            >
              <JDtypho color="error" mr="tiny">
                {LANG("must")}
              </JDtypho>
              {LANG("personal_use_agree")}
            </JDalign>

            <JDbutton
              size="small"
              mode="border"
              onClick={() => {
                agreePolicyModalHook.openModal();
              }}
              mb="no"
              mr="no"
              label="약관보기"
            />
          </JDalign>
        )}
      </JDtypho>
      <AgreePolicyModal modalHook={agreePolicyModalHook} />
    </JDalign>
  );
};

export default AgreeBlock;
