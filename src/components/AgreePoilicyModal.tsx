import React from "react";
import { IUseModal, JDmodal, JDtypho } from "@janda-com/front";
import { LANG } from "../App";

interface Iprops {
  modalHook: IUseModal;
}

const AgreePolicyModal: React.FC<Iprops> = ({ modalHook }) => {
  return (
    <JDmodal {...modalHook}>
      <div className="agreePrivacyPolicy" id="agreePrivacyPolicy">
        <div>
          <div>
            {LANG(
              "we_collect_your_personal_information_to_provide_the_service"
            )}
          </div>
          <table>
            <thead>
              <tr>
                <th>{LANG("privacy_item")}</th>
                <th>{LANG("purpose_of_collection")}</th>
                <th>{LANG("retention_period")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {LANG("name")},{LANG("contact")}
                </td>
                <td>{LANG("smooth_reservation_management")}</td>
                <td>{LANG("six_months_after_stay")}</td>
              </tr>
            </tbody>
          </table>
          <JDtypho color="error">
            {`※ ${LANG(
              "the_minimum_personal_information_required_to_provide_the_service_is_required_to_use_the_service"
            )}`}
            <br />
            {`※ ${LANG(
              "if_you_violate_the_accommodation_policy_your_personal_information_will_be_saved_with_the_violation"
            )} `}
          </JDtypho>
        </div>
      </div>
    </JDmodal>
  );
};

export default AgreePolicyModal;
