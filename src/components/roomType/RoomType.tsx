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
  isEmpty,
} from "@janda-com/front";
import { getHouseForPublic_GetHouseForPublic_house_roomTypes } from "../../types/api";
import { IResvContext, IRoomSelectInfo } from "../../pages/declare";
import CountSelecter from "./CountSelecter";
import { IRoomTypeContext } from "./RoomTypeWrap";
import { getAvailableCountFromQuery } from "./helper";
import PopUpDetailModal from "./PopUpDetailModal";
import { OptionSelecter } from "./OptionSelecter";
import isMobile from "is-mobile";
import CheckBoxMini from "../../atom/CheckBox";
import { LANG } from "../../lang/lang";
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
  const [detailOpen, setDetailOpen] = useState(false);
  const productVeiwerModal = useModal(true);
  const photoModalHook = useModal();
  const {
    setRoomSelectInfo,
    roomSelectInfo,
    from,
    to,
  } = resvContext;
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
  const exception = roomType.name == "요트퍼블릭 60분";

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
          onClick={isMobile() ? handleRoomSelectTooggler : undefined}
          className="roomType__wrap"
          flex={{
            grow: true,
            wrap: true
          }}
        >
          <JDalign
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              photoModalHook.openModal({
                images,
              });
            }}
            style={{
              height: "11rem",
              maxWidth: "10.7rem",
            }}
            className="roomType__slider"
          >
            <CheckBoxMini handleClick={(e: any) => {
              e.stopPropagation();
              handleRoomSelectTooggler();
            }} className="roomType__checkbox" checked={isSelected} />
            <JDslider
              onClick={e => { e.preventDefault(); e.stopPropagation() }}
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
                className="roomType__mid"
                mr="large"
              >
                {description && (
                  <JDtypho size="small" className="roomType__describ">
                    {isMobile() ? description.slice(0, 60) : description}
                    {isMobile() && description.length > 60 && <JDtypho onClick={() => {
                      setDetailOpen(!detailOpen);
                    }} hover color="point">
                      {detailOpen ? '...닫기' : '...더보기'}
                    </JDtypho>}
                  </JDtypho>
                )}
                <JDalign
                  mr="no"
                  flex={{
                    end: true
                  }}
                  className="roomType__selectpart--mb"
                >
                  <JDtypho mr="tiny" mb="no" size="h6">
                    {autoComma(fullDatePrice)}
                  </JDtypho>
                  <JDtypho style={{
                    alignSelf: "flex-end"
                  }} size="small">KRW</JDtypho>
                </JDalign>
              </JDalign>
            </JDalign>
            <JDalign
              className="roomType__selectpart--pc"
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
      {detailOpen && <div className="roomType__detailSection">
        {description}
      </div>}
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
              <OptionSelecter resvContext={resvContext} optionalItems={optionalItems} targetSelectRoom={targetSelectRoom} setRoomSelectInfo={setRoomSelectInfo} roomSelectInfo={roomSelectInfo} />
            </div>
          }
        </div>
      )}

      {popUpDetailPage && targetSelectInfo && (
        <PopUpDetailModal
          roomTypeContext={roomTypeContext}
          availableCount={availableCount}
          roomType={roomType}
          handleDoResvBtn={handleDoResvBtn}
          resvContext={resvContext}
          optionalItems={optionalItems}
          images={roomType.images || []}
          isSoldOut={!!isSoldOut}
          popUpProductClose={popUpProductClose}
          productVeiwerModal={productVeiwerModal}
          DailyPrice={DailyPrice}
        />
      )}
    </div>
  );
};

export default RoomType;
