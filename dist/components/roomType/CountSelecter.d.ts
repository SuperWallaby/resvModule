import React from 'react';
import { IJDalignProp } from '@janda-com/front';
import { IResvContext, IRoomSelectInfo } from '../../pages/declare';
import { getHouseForPublic_GetHouseForPublic_house_roomTypes } from '../../types/api';
import { IRoomTypeContext } from './RoomTypeWrap';
import { IJDtyphoProp } from '@janda-com/front/build/components/typho/Typho';
interface CounterProp {
    count: number;
    handleCount: (flag: boolean, target: any) => any;
    target?: any;
    label: string;
    labelProp?: IJDtyphoProp;
    maxCount: number;
}
export declare const Counter: React.FC<CounterProp>;
interface IProps {
    resvContext: IResvContext;
    roomType: getHouseForPublic_GetHouseForPublic_house_roomTypes;
    fullDatePrice: number;
    targetSelectInfo: IRoomSelectInfo;
    isDomitory: boolean;
    roomTypeContext: IRoomTypeContext;
    availableCount: {
        maleCount: number;
        femaleCount: number;
        roomCount: number;
    };
    alignProp?: IJDalignProp;
}
declare const CountSelecter: React.FC<IProps>;
export default CountSelecter;
