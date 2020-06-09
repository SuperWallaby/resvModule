import React from 'react';
import { JDalign, JDtypho } from '@janda-com/front';
import { TElements } from '@janda-com/front/build/types/interface';
import { IDiv } from '@janda-com/front/src/types/interface';

interface IProps {
    wrapProp?: IDiv;
    label: string;
    value: TElements;
}
export const InfoRender: React.FC<IProps> = ({ wrapProp, label, value }) => {
    return <JDalign
        {...wrapProp}
        flex={{
            between: true,
        }}
    >
        <JDtypho weight={600}>{label}</JDtypho>
        <JDtypho>
            {value}
        </JDtypho>
    </JDalign>;
};
