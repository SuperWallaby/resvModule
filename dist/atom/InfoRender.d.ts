import React from 'react';
import { TElements } from '@janda-com/front/build/types/interface';
import { IDiv } from '@janda-com/front/src/types/interface';
interface IProps {
    wrapProp?: IDiv;
    label: string;
    value: TElements;
}
export declare const InfoRender: React.FC<IProps>;
export {};
