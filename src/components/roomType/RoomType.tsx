import React from "react";
import {
  JDphotoFrame,
  JDslider,
  JDslide,
  JDalign,
  JDtypho,
  utills,
  JDbutton
} from "@janda-com/front";
import {
  getHouseForPublic_GetHouseForPublic_house_roomTypes,
  getRoomTypeInfo_GetRoomTypeDatePrices_roomTypeDatePrices
} from "../../types/api";
import "./RoomType.scss";
import { LANG } from "../../App";

const { autoComma } = utills;

interface IProps {
  roomType: getHouseForPublic_GetHouseForPublic_house_roomTypes;
  totalPrice: number;
}

const RoomType: React.FC<IProps> = ({ roomType, totalPrice }) => {
  const { name } = roomType;
  return (
    <div>
      <JDalign
        flex={{
          grow: true
        }}
        className="roomType"
      >
        <JDalign className="roomType__slider">
          <JDslider
            mr="small"
            mb="no"
            autoplay
            dots={false}
            displayArrow={false}
          >
            <JDslide>
              <JDphotoFrame
                isBgImg
                style={{
                  height: "4rem"
                }}
              />
            </JDslide>
            <JDslide>
              <JDphotoFrame
                isBgImg
                style={{
                  height: "4rem"
                }}
              />
            </JDslide>
            <JDslide>
              <JDphotoFrame
                isBgImg
                style={{
                  height: "4rem"
                }}
              />
            </JDslide>
          </JDslider>
        </JDalign>
        <JDalign
          flex={{
            between: true
          }}
          className="roomType__img"
        >
          <div>
            <div className="roomType__title">
              <JDtypho mb="small" weight={600}>
                {name}
              </JDtypho>
            </div>
            <div className="roomType__title">
              {1 + LANG("sleep_unit")}
              {` - `}
              {autoComma(totalPrice)}
            </div>
          </div>
          <JDalign
            flex={{
              column: true,
              between: true
            }}
          >
            <JDbutton mr="no" mb="normal" br="no" mode="flat" thema="primary">
              {LANG("choice")}
            </JDbutton>
            <JDtypho size="h6">{autoComma(totalPrice)}</JDtypho>
          </JDalign>
        </JDalign>
      </JDalign>
    </div>
  );
};

export default RoomType;
