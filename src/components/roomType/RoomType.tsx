import React, { useState } from "react";
import {
  JDphotoFrame,
  JDslider,
  JDslide,
  JDalign,
  JDtypho,
  utills,
  JDbutton,
  JDpreloader,
  JDbadge,
} from "@janda-com/front";
import { getHouseForPublic_GetHouseForPublic_house_roomTypes } from "../../types/api";
import { LANG } from "../../App";
import { IResvContext, IRoomSelectInfo } from "../../pages/declare";
import CountSelecter from "./CountSelecter";
import { IRoomTypeContext } from "./RoomTypeWrap";
import { getAvailableCountFromQuery } from "./helper";

const { autoComma } = utills;

interface IProps {
  resvContext: IResvContext;
  roomType: getHouseForPublic_GetHouseForPublic_house_roomTypes;
  dailyPrice: number;
  roomTypeContext: IRoomTypeContext;
  countLoading: boolean;
}

const RoomType: React.FC<IProps> = ({
  roomType,
  dailyPrice,
  resvContext,
  roomTypeContext,
  countLoading,
}) => {
  const { name, img } = roomType;
  const { setRoomSelectInfo, roomSelectInfo, from, to } = resvContext;
  const {
    fullDatePrice,
    isDomitory,
    isSelected,
    targetSelectInfo,
    capacityData,
  } = roomTypeContext;
  const availableCount = getAvailableCountFromQuery(capacityData!);
  const totalCan =
    availableCount.femaleCount +
    availableCount.maleCount +
    availableCount.roomCount;
  const isSoldOut = !totalCan && !countLoading && from && to;
  const loading = countLoading && from && to;

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
        className="roomType__wrap"
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
                  borderRadius: "0px",
                  height: "6rem",
                }}
              />
            </JDslide>
            <JDslide>
              <JDphotoFrame
                isBgImg
                unStyle
                style={{
                  borderRadius: "0px",
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
          className="roomType__right"
        >
          <div>
            <div className="roomType__title">
              <JDalign flex>
                <JDtypho mb="small" weight={600}>
                  {name}
                </JDtypho>
                <div>
                  {isSoldOut && (
                    <JDbadge size="noraml" thema="error">
                      SOLD OUT
                    </JDbadge>
                  )}
                </div>
              </JDalign>
            </div>
            <div className="roomType__title">
              {1 + LANG("sleep_unit")}
              {` - `}
              {loading ? "..." : autoComma(dailyPrice || 0)}
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
            {countLoading ? (
              <JDpreloader
                style={{
                  margin: "-10px",
                }}
                size="tiny"
                loading={true}
              />
            ) : (
              <JDtypho mb="no" size="h6">
                {autoComma(fullDatePrice)}
              </JDtypho>
            )}
          </JDalign>
        </JDalign>
      </JDalign>
      {targetSelectInfo && (
        <CountSelecter
          availableCount={availableCount}
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
