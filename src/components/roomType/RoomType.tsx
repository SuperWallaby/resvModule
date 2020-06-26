import React, { useState } from "react";
import {
  JDphotoFrame,
  JDslider,
  JDslide,
  JDalign,
  JDtypho,
  utils,
  JDbutton,
  JDpreloader,
  JDbadge,
  JDphotoModal,
  useModal,
  useSelect,
  selectOpCreater,
} from "@janda-com/front";
import { getHouseForPublic_GetHouseForPublic_house_roomTypes } from "../../types/api";
import { LANG } from "../../App";
import { IResvContext, IRoomSelectInfo } from "../../pages/declare";
import CountSelecter, {Counter} from "./CountSelecter";
import { IRoomTypeContext } from "./RoomTypeWrap";
import { getAvailableCountFromQuery } from "./helper";
import PopUpDetailModal from "./PopUpDetailModal";
import { OptionSelecter } from "./OptionSelecter";
import { isEmpty } from "lodash";

const IS_MOBILE = false;

const { autoComma } = utils;

interface IProps {
  resvContext: IResvContext;
  roomType: getHouseForPublic_GetHouseForPublic_house_roomTypes;
  dailyPrice: number;
  roomTypeContext: IRoomTypeContext;
  countLoading: boolean;
  popUpDetailPage?: boolean;
  priceLoading: boolean;
  handleDoResvBtn: () => void;
}

const RoomType: React.FC<IProps> = ({
  roomType,
  dailyPrice,
  resvContext,
  roomTypeContext,
  countLoading,
  priceLoading,
  popUpDetailPage,
  handleDoResvBtn,
}) => {
  const {
    _id,
    name,
    pricingType,
    img,
    images,
    description,
    defaultPrice,
    optionalItems
  } = roomType;
  const publicSelectHook = useSelect(
    { label: "10시", value: 10 },
    selectOpCreater({
      count: 10,
      labelAdd: "시",
      start: 10,
    })
  );
  const productVeiwerModal = useModal(true);
  const photoModalHook = useModal();
  const { setRoomSelectInfo, roomSelectInfo, from, to } = resvContext;
  const {
    fullDatePrice,
    isDomitory,
    isSelected,
    targetSelectInfo,
    capacityData,
  } = roomTypeContext;

  const targetSelectRoom = roomSelectInfo.find(rsi => rsi.roomTypeId === roomType._id);

  const availableCount = getAvailableCountFromQuery(capacityData!);
  const totalCan =
    availableCount.femaleCount +
    availableCount.maleCount +
    availableCount.roomCount;
  const isSoldOut = !totalCan && !countLoading && from && to;
  const loading = countLoading && from && to;

  if (images?.length === 0) {
    images.push(img?.url);
  }

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
      pricingType: pricingType,
      roomTypeId: _id,
      roomTypeName: name,
      img: img?.url,
    };
    const added = [...roomSelectInfo, addInfo];
    setRoomSelectInfo(isSelected ? filted : added);
  };

  const currentPrice = autoComma(dailyPrice || 0);
  const isSale = defaultPrice ? defaultPrice > dailyPrice : false;
  const DailyPrice = () =>
    priceLoading ? (
      <span>...</span>
    ) : isSale ? (
      <span>
        <JDtypho
          size="small"
          component={"span"}
          style={{
            textDecoration: "line-through",
          }}
        >
          {defaultPrice} KRW
        </JDtypho>
        <JDtypho size="small" color="error">
          {currentPrice} KRW
        </JDtypho>
      </span>
    ) : (
      <span>{currentPrice}</span>
    );

  const popUpProductClose = () => {
    window.history.go(-1);
  };

  return (
    <div className={classes}>
      <div className="roomType__inner">
        <JDalign
          className="roomType__wrap"
          flex={{
            center: IS_MOBILE ? true : false,
            column: IS_MOBILE ? true : false,
            grow: IS_MOBILE ? false : true,
          }}
          style={{
            padding: IS_MOBILE ? "0.4rem" : 0,
            paddingTop: IS_MOBILE ? "0.8rem" : 0,
          }}
        >
          <JDalign
            onClick={() => {
              photoModalHook.openModal({
                images,
              });
            }}
            style={{
              height: IS_MOBILE ? "24rem" : "11rem",
              width: IS_MOBILE ? "19rem" : undefined,
              maxWidth: IS_MOBILE ? undefined : "10.7rem",
            }}
            className="roomType__slider"
          >
            <JDslider
              autoplay
              dots={false}
              mr="small"
              mb="no"
              style={{
                overflow: "hidden",
              }}
              displayArrow={false}
            >
              {images?.map((img, i) => (
                <JDslide key={i + "imgSlider"}>
                  <JDphotoFrame
                    style={{
                      borderRadius: 0,
                    }}
                    src={img}
                    isBgImg
                    unStyle
                  />
                </JDslide>
              ))}
            </JDslider>
            <div>
              {isSoldOut && (
                <JDbadge
                  className="roomType__soldOut"
                  size="noraml"
                  thema="error"
                >
                  SOLD OUT
                </JDbadge>
              )}
            </div>
          </JDalign>
          <JDalign
            flex={{
              between: true,
            }}
            className="roomType__right"
          >
            <JDalign
              style={{
                flexGrow: 1,
              }}
              grid
            >
              <JDalign
                col={{
                  md: 12,
                  full: 6,
                }}
                mb="tiny"
              >
                <div className="roomType__title">
                  <JDalign flex>
                    <JDtypho mb="small" weight={600}>
                      {name}
                    </JDtypho>
                  </JDalign>
                </div>
                <div className="roomType__title">
                  {1 + "명"}
                  {` - `}
                  <DailyPrice />
                </div>
              </JDalign>
              <JDalign
                col={{
                  md: 12,
                  full: 6,
                }}
                style={{
                  whiteSpace: "pre-line",
                }}
                mr="large"
              >
                {description && (
                  <JDtypho size="small" className="roomType__describ">
                    {description}
                  </JDtypho>
                )}
              </JDalign>
            </JDalign>
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
                disabled={!!isSoldOut}
                thema={isSelected ? "white" : "primary"}
              >
                {LANG(isSelected ? "cancel" : "choice")}
              </JDbutton>
              {priceLoading ? (
                <JDpreloader
                  style={{
                    margin: "-10px",
                  }}
                  size="tiny"
                  loading={true}
                />
              ) : (
                <JDtypho mb="no" size="h6">
                  {autoComma(fullDatePrice)} KRW
                </JDtypho>
              )}
            </JDalign>
          </JDalign>
        </JDalign>
      </div>
      <JDphotoModal modalHook={photoModalHook} />
      {targetSelectInfo && (
        <div className="roomType__countSelectWrap">
          <div className="roomType__countMainWrap"> 
            <CountSelecter
              availableCount={availableCount}
              roomTypeContext={roomTypeContext}
              isDomitory={isDomitory}
              targetSelectInfo={targetSelectInfo}
              fullDatePrice={fullDatePrice}
              roomType={roomType}
              resvContext={resvContext}
            />
        </div>
        {isEmpty(optionalItems) ||
        <div className="roomType__optionalItems">
          <JDtypho className="roomType__optionTitle" weight={600} >옵션선택</JDtypho>
         <OptionSelecter optionalItems={optionalItems} targetSelectRoom={targetSelectRoom} setRoomSelectInfo={setRoomSelectInfo} roomSelectInfo={roomSelectInfo} />
      </div>
}
      </div>
      )}

      {popUpDetailPage && targetSelectInfo && (
        <PopUpDetailModal
          DailyPrice={DailyPrice}
          availableCount={availableCount}
          roomType={roomType}
          roomTypeContext={roomTypeContext}
          resvContext={resvContext}
          optionalItems={optionalItems}
          images={roomType.images || []}
          isSoldOut={!!isSoldOut}
          handleDoResvBtn={handleDoResvBtn}
          productVeiwerModal={productVeiwerModal}
          popUpProductClose={popUpProductClose}
        />
      )}
    </div>
  );
};

export default RoomType;
