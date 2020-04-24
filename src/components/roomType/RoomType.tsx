import React from "react";
import {
  JDphotoFrame,
  JDslider,
  JDslide,
  JDalign,
  JDtypho,
  utills,
  JDbutton,
} from "@janda-com/front";
import { getHouseForPublic_GetHouseForPublic_house_roomTypes } from "../../types/api";
import { PricingType } from "../../types/enum";
import "./RoomType.scss";
import { LANG } from "../../App";
import { IResvContext, IRoomSelectInfo } from "../../pages/declare";
import moment from "moment";
import CountSelecter from "./CountSelecter";
import { IRoomTypeContext } from "./RoomTypeWrap";

const { autoComma } = utills;

interface IProps {
  resvContext: IResvContext;
  roomType: getHouseForPublic_GetHouseForPublic_house_roomTypes;
  dailyPrice: number;
  roomTypeContext: IRoomTypeContext;
}

const RoomType: React.FC<IProps> = ({
  roomType,
  dailyPrice,
  resvContext,
  roomTypeContext,
}) => {
  const { name, img } = roomType;
  const { setRoomSelectInfo, roomSelectInfo } = resvContext;
  const {
    fullDatePrice,
    isDomitory,
    isSelected,
    targetSelectInfo,
  } = roomTypeContext;

  let classes = "roomType";
  classes += isSelected ? " roomType--selected" : "";

  const handleRoomSelectTooggler = () => {
    const filted = roomSelectInfo.filter((r) => r.roomTypeId !== roomType._id);
    const addInfo: IRoomSelectInfo = {
      count: {
        female: 0,
        male: 0,
        roomCount: 0,
      },
      price: 0,
      pricingType: roomType.pricingType,
      roomTypeId: roomType._id,
      roomTypeName: roomType.name,
      img: roomType.img?.url,
    };
    const added = [...roomSelectInfo, addInfo];
    setRoomSelectInfo(isSelected ? filted : added);
  };

  return (
    <div className={classes}>
      <JDalign
        className="roomType__up"
        flex={{
          grow: true,
        }}
      >
        <JDalign className="roomType__slider">
          <JDslider
            autoplay
            dots={false}
            mr="small"
            mb="no"
            displayArrow={false}
          >
            <JDslide>
              <JDphotoFrame
                src={img?.url}
                isBgImg
                unStyle
                style={{
                  height: "6rem",
                }}
              />
            </JDslide>
            <JDslide>
              <JDphotoFrame
                isBgImg
                unStyle
                style={{
                  height: "6rem",
                }}
              />
            </JDslide>
          </JDslider>
        </JDalign>
        <JDalign
          flex={{
            between: true,
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
              {autoComma(dailyPrice)}
            </div>
          </div>
          <JDalign
            style={{
              alignItems: "flex-end",
            }}
            flex={{
              column: true,
              between: true,
              end: true,
            }}
          >
            <JDbutton
              size="small"
              onClick={handleRoomSelectTooggler}
              mr="no"
              mb="normal"
              br="no"
              mode="flat"
              thema={isSelected ? "white" : "primary"}
            >
              {LANG(isSelected ? "cancel" : "choice")}
            </JDbutton>
            <JDtypho size="h6">{autoComma(fullDatePrice)}</JDtypho>
          </JDalign>
        </JDalign>
      </JDalign>
      {targetSelectInfo && (
        <CountSelecter
          roomTypeContext={roomTypeContext}
          isDomitory={isDomitory}
          targetSelectInfo={targetSelectInfo}
          fullDatePrice={fullDatePrice}
          roomType={roomType}
          resvContext={resvContext}
        />
      )}
    </div>
  );
};

export default RoomType;
