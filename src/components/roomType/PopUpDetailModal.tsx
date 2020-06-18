import React from "react";
import {
  JDmodal,
  IUseModal,
  JDalign,
  JDbadge,
  JDslider,
  JDslide,
  JDphotoFrame,
  JDtypho,
  JDdayPicker,
  JDbutton,
  JDselect,
  toast,
} from "@janda-com/front";
import moment from "moment";
import { autoComma } from "@janda-com/front";
import { IResvContext, IRoomSelectInfo } from "../../pages/declare";
import { selectOpCreater } from "@janda-com/front";
import { useSelect } from "@janda-com/front";
import { getHouseForPublic_GetHouseForPublic_house_roomTypes } from "../../types/api";
import CountSelecter from "./CountSelecter";
import { IRoomTypeContext } from "./RoomTypeWrap";
import { LANG } from "../../App";

interface IProp {
  popUpProductClose: () => void;
  productVeiwerModal: IUseModal;
  isSoldOut: boolean;
  images: string[];
  handleDoResvBtn: () => void;
  resvContext: IResvContext;
  roomType: getHouseForPublic_GetHouseForPublic_house_roomTypes;
  roomTypeContext: IRoomTypeContext;
  availableCount: {
    maleCount: number;
    femaleCount: number;
    roomCount: number;
  };
  DailyPrice: () => JSX.Element;
}

export const PopUpDetailModal: React.FC<IProp> = ({
  roomTypeContext,
  availableCount,
  roomType,
  handleDoResvBtn,
  resvContext,
  images,
  isSoldOut,
  popUpProductClose,
  productVeiwerModal,
  DailyPrice,
}) => {
  const exception = roomType.name == "요트퍼블릭 60분";

  const publicSelectHook = useSelect(
    { label: "9시", value: 9 },
    selectOpCreater({
      count: 10,
      labelAdd: "시",
      start: 9,
    })
  );
  const { dayPickerHook, setBookerInfo, bookerInfo, from } = resvContext;
  const { isDomitory, targetSelectInfo, fullDatePrice } = roomTypeContext;
  const name = roomType.name;
  if (!targetSelectInfo) throw Error("targetSelectInfo not exsist");

  return (
    <JDmodal
      className="popUpDetailModal"
      fullInMobile
      onRequestClose={popUpProductClose}
      {...productVeiwerModal}
      head={{ title: `${name}`, closeFn: popUpProductClose }}
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
                날짜선택
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
              {exception && (
                <div>
                  <JDselect {...publicSelectHook} label="시간선택" />
                </div>
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
              mb="large"
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

          <JDalign mb="largest">
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
            onClick={() => {
              const timeValue = publicSelectHook.selectedOption?.value;

              if (exception) {
                if (!timeValue) toast.warn("시간을 선택 해주세요.");

                setBookerInfo({
                  ...bookerInfo,
                  hiddenMemo: `시간:${timeValue}`,
                });
              }

              handleDoResvBtn();
            }}
            mb="no"
            thema="primary"
            size="longLarge"
            label="예약하기"
          />
        </JDalign>
      </JDalign>
    </JDmodal>
  );
};
