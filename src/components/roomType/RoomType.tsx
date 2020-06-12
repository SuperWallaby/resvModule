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

const IS_MOBILE = isMobile();

const { autoComma } = utils;

interface IProps {
  resvContext: IResvContext;
  roomType: getHouseForPublic_GetHouseForPublic_house_roomTypes;
  dailyPrice: number;
  roomTypeContext: IRoomTypeContext;
  countLoading: boolean;
  popUpDetailPage?: boolean;
}

const RoomType: React.FC<IProps> = ({
  roomType,
  dailyPrice,
  resvContext,
  roomTypeContext,
  countLoading,
  popUpDetailPage,
}) => {
  const { _id, name, pricingType, img, images, description } = roomType;
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
            onClick={() => {
              photoModalHook.openModal({
                images,
              });
            }}
            autoplay
            dots={false}
            mr="no"
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
          <div>
            <div className="roomType__title">
              <JDalign
                flex={{
                  between: true,
                }}
              >
                <JDtypho size="small" mb="small" weight={600}>
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
            onClick={() => {
              photoModalHook.openModal({
                images,
              });
            }}
            style={{
              height: IS_MOBILE ? "11rem" : "6rem",
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
                  <JDphotoFrame src={img} isBgImg unStyle />
                </JDslide>
              ))}
            </JDslider>
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
                  {1 + "명"}
                  {` - `}
                  {loading ? "..." : autoComma(dailyPrice || 0)}
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
      </JDalign>
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
                  size="noraml"
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
                    {1 + LANG("sleep_unit")}
                    {` - `}
                    {loading ? "..." : autoComma(dailyPrice || 0)}
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
                      <JDtypho weight={600} mb="normal">
                        상품설명
                      </JDtypho>
                      {roomType.description}
                    </div>
                  )}
                </JDalign>
              </JDalign>

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
