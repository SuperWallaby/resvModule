import React from "react";
import { IUseModal, JDmodalConfigProps } from "@janda-com/front";
export declare type SubLine = {
    title: string;
    price: number;
    describe?: string;
};
export declare type PriceLine = {
    title: string;
    price: number;
    sub: SubLine[];
    describe?: string;
};
interface ICalculaterProp {
    products: PriceLine[];
}
declare const CalculateViewer: React.FC<ICalculaterProp>;
interface IProp extends ICalculaterProp {
    modalHook: IUseModal;
    modalProp: JDmodalConfigProps;
}
export declare const CalculateViewerModal: React.FC<IProp>;
export default CalculateViewer;
