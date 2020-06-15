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
  JDmodal,
  JDicon,
  JDdayPicker,
} from "@janda-com/front";
import { getHouseForPublic_GetHouseForPublic_house_roomTypes } from "../../types/api";
import { LANG } from "../../App";
import { IResvContext, IRoomSelectInfo } from "../../pages/declare";
import CountSelecter from "./CountSelecter";
import { IRoomTypeContext } from "./RoomTypeWrap";
import { getAvailableCountFromQuery } from "./helper";
import { ExtraRoomTypeConfig } from "../../types/enum";
import { isMobile } from "is-mobile";
import { isEmpty } from "@janda-com/front";
import moment from "moment";

const IS_MOBILE = isMobile();

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
  } = roomType;
  const productVeiwerModal = useModal(true);
  const photoModalHook = useModal();
  const {
    setRoomSelectInfo,
    roomSelectInfo,
    from,
    to,
    dayPickerHook,
  } = resvContext;
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
          {defaultPrice}
        </JDtypho>
        <JDtypho size="small" color="error">
          {currentPrice}
        </JDtypho>
      </span>
    ) : (
      <span>{currentPrice}</span>
    );

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
                  {autoComma(fullDatePrice)}
                </JDtypho>
              )}
            </JDalign>
          </JDalign>
        </JDalign>
      </div>
      <JDphotoModal modalHook={photoModalHook} />
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
      {popUpDetailPage && targetSelectInfo && (
        <JDmodal
          className="popUpDetailModal"
          fullInMobile
          {...productVeiwerModal}
          head={{ title: `${name}` }}
        >
          <JDalign
            style={{
              maxWidth: "1000px",
            }}
            grid
          >
            <JDalign
              style={{
                position: "relative",
              }}
              col={{
                full: 6,
                wlg: 12,
              }}
            >
              {isSoldOut && (
                <JDbadge
                  className="popUpDetailModal__soldOut"
                  size="large"
                  thema="error"
                >
                  SOLD OUT
                </JDbadge>
              )}
              <JDslider
                autoplay
                dots={false}
                mr="no"
                mb="large"
                displayArrow={false}
              >
                {(images || []).map((img, i) => (
                  <JDslide key={i + "popUpDetailPageImg"}>
                    <JDphotoFrame mr="no" src={img} unStyle />
                  </JDslide>
                ))}
              </JDslider>
            </JDalign>
            <JDalign
              col={{
                full: 6,
                wlg: 12,
              }}
            >
              <JDalign mb="large" grid>
                <JDtypho mb="large">
                  <JDtypho weight={600} mb="normal">
                    날짜
                  </JDtypho>
                  {dayPickerHook && from && (
                    <JDdayPicker
                      isRange={false}
                      displayIcon={true}
                      mode="input"
                      {...dayPickerHook}
                      inputComponent={(prop: any) => (
                        <JDbutton mode="border" {...prop}>
                          {moment(from!).format("YYYY-MM-DD")}
                        </JDbutton>
                      )}
                    />
                  )}
                </JDtypho>
                <JDalign
                  col={{
                    full: 6,
                    wlg: 12,
                  }}
                >
                  <JDtypho size="h6" mb="normal" weight={600}>
                    {name}
                  </JDtypho>
                  <JDtypho mb="large">
                    <JDtypho weight={600} mb="small">
                      가격
                    </JDtypho>
                    {1 + LANG("sleep_unit")}
                    {` - `}
                    <DailyPrice />
                  </JDtypho>
                </JDalign>

                <JDalign
                  col={{
                    full: 6,
                    wlg: 12,
                  }}
                >
                  {roomType.description && (
                    <div>
                      <JDtypho weight={600} mb="small">
                        상품설명
                      </JDtypho>
                      {roomType.description}
                    </div>
                  )}
                </JDalign>
              </JDalign>

              <JDalign mb="large">
                <CountSelecter
                  alignProp={{
                    flex: {
                      around: true,
                    },
                    style: {
                      justifyContent: "around",
                    },
                  }}
                  availableCount={availableCount}
                  roomTypeContext={roomTypeContext}
                  isDomitory={isDomitory}
                  targetSelectInfo={targetSelectInfo}
                  fullDatePrice={fullDatePrice}
                  roomType={roomType}
                  resvContext={resvContext}
                />
              </JDalign>
              <JDtypho mb="large" color="error" size="large">
                <JDalign
                  flex={{
                    between: true,
                  }}
                >
                  <div>총금액:</div>
                  <div>
                    <JDtypho mb="no" size="h6">
                      {autoComma(targetSelectInfo.price)}
                    </JDtypho>
                  </div>
                </JDalign>
              </JDtypho>

              <JDbutton
                onClick={handleDoResvBtn}
                mb="no"
                thema="primary"
                size="longLarge"
                label="예약하기"
              />
            </JDalign>
          </JDalign>
        </JDmodal>
      )}
    </div>
  );
};

export default RoomType;
