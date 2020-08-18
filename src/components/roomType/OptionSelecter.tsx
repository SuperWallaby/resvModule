import { getHouseForPublic_GetHouseForPublic_house_roomTypes_optionalItems } from "../../types/api";
import { IRoomSelectInfo, IResvContext } from "../../pages/declare";
import { JDtypho, autoComma, JDalign } from "@janda-com/front";
import { Counter } from "./CountSelecter";
import React from "react";
import { ISet } from "@janda-com/front/build/types/interface";
import moment from "moment";

interface IProp {
  optionalItems: getHouseForPublic_GetHouseForPublic_house_roomTypes_optionalItems[];
  targetSelectRoom: IRoomSelectInfo | undefined;
  setRoomSelectInfo: ISet<IRoomSelectInfo[]>
  roomSelectInfo: IRoomSelectInfo[]
  resvContext: IResvContext;
}

export type TTargetOp = {
  label: string;
  _id: string;
  price: number;
  count: number;
} | undefined

export const OptionSelecter: React.FC<IProp> = ({ optionalItems, targetSelectRoom, roomSelectInfo, setRoomSelectInfo, resvContext }) => {

  const { from, to } = resvContext;

  const diffCount = moment(to).diff(from, "day");

  const handleCount = (flag: boolean, targetOp: TTargetOp, op: getHouseForPublic_GetHouseForPublic_house_roomTypes_optionalItems) => {
    const sum = flag ? 1 : -1;
    const upCount = sum + (targetOp?.count || 0);

    let price = (op.price || 0) * upCount;
    if (op.multiplyDate)
      price *= diffCount;

    const upDateValue = {
      label: op.label,
      _id: op._id,
      count: upCount,
      price
    }

    if (targetOp) {
      targetOp.count = upDateValue.count;
      targetOp.price = upDateValue.price;
    } else if (targetSelectRoom) {
      if (targetSelectRoom.options)
        targetSelectRoom.options.push(upDateValue);
      else
        targetSelectRoom["options"] = [upDateValue];
    }

    setRoomSelectInfo([...roomSelectInfo])
  }

  return <div>
    {targetSelectRoom && optionalItems.map(op => {
      let price = (op.price || 0);
      if (op.multiplyDate)
        price *= diffCount;

      let targetOp = targetSelectRoom.options?.find(op => op._id === op._id);
      if (!targetSelectRoom) return <div />
      return <JDalign flex={{
        between: true
      }} className="roomType__optionalItem" key={op._id}>
        <Counter
          labelProp={{
            weight: 400
          }}
          maxCount={op.maxCount || 999}
          label={op.label}
          handleCount={(flag) => handleCount(flag, targetOp, op)}
          count={targetOp?.count || 0}
          target={op._id}
        />
        <div>
          <JDtypho mb="no">{autoComma(price)} KRW</JDtypho>
          <JDtypho size="tiny">*1인당</JDtypho>
        </div>
      </JDalign>
    })}
  </div>
}