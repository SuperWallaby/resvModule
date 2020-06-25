import { getHouseForPublic_GetHouseForPublic_house_roomTypes_optionalItems } from "../../types/api";
import { IRoomSelectInfo } from "../../pages/declare";
import { JDtypho, autoComma, JDalign } from "@janda-com/front";
import { Counter } from "./CountSelecter";
import React from "react";
import { ISet } from "@janda-com/front/build/types/interface";

interface IProp {
    optionalItems: getHouseForPublic_GetHouseForPublic_house_roomTypes_optionalItems[];
    targetSelectRoom: IRoomSelectInfo | undefined;
    setRoomSelectInfo: ISet<IRoomSelectInfo[]>
    roomSelectInfo: IRoomSelectInfo[]
}


export const OptionSelecter:React.FC<IProp> = ({optionalItems,targetSelectRoom,roomSelectInfo,setRoomSelectInfo}) => {
    return <div>
    {targetSelectRoom && optionalItems.map(op => {
        let targetOp = targetSelectRoom.options?.find(op => op._id === op._id);
        if(!targetSelectRoom) return <div/>
        return <JDalign flex={{
          between:true
        }} className="roomType__optionalItem" key={op._id}>
        <Counter
          maxCount={op.maxCount || 999}
          label={op.label}
          handleCount={(flag)=> {
            const sum = flag ? 1 : -1;
            const upCount = sum +  (targetOp?.count || 0);
            const upDateValue = {
              label: op.label,
              _id: op._id,
              count: upCount,
              price: ((op.price || 0) * upCount)
            }
            if (targetOp) {
              targetOp.count = upDateValue.count;
              targetOp.price = upDateValue.price;
            } else {
              if(targetSelectRoom.options) 
              targetSelectRoom.options.push(upDateValue);
              else 
              targetSelectRoom["options"] = [upDateValue];
            }
            
            setRoomSelectInfo([...roomSelectInfo])
          }}
          count={targetOp?.count || 0}
          target={op._id}
        />
        <div>
        <JDtypho mb="no">{autoComma(op.price || 0)} KRW</JDtypho>
        <JDtypho size="tiny">*1인당</JDtypho>
        </div>
    </JDalign>
  })}
  </div>
}