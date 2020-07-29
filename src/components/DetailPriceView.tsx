import React from "react";
import { JDmodal, IUseModal, JDtypho, JDdayPicker, JDmodalConfigProps, JDalign } from "@janda-com/front"
import { arraySum } from "@janda-com/front";
import { toNumber } from "lodash";
import { autoComma } from "@janda-com/front";
import { LANG } from "../App";


export type SubLine = {
    title: string;
    price: number;
    describe?: string;
  };
  
export type PriceLine = {
    title: string;
    price: number;
    sub: SubLine[];
    describe?: string;
};
  
interface ICalculaterProp {
    products: PriceLine[];
}
  
const CalculateViewer: React.FC<ICalculaterProp> = ({ products }) => {
const total = arraySum(
    products.map(
    p => toNumber(p.price) + arraySum(p.sub.map(subp => toNumber(subp.price)))
    )
);

return (
    <div className="calculateViewer">
    {products.map(p => (
        <div className="calculateViewer__history">
        <div className="calculateViewer__historyInner">
            <JDtypho weight={600} size="h5">
            <JDalign
                flex={{
                between: true
                }}
            >
                <span>{p.title}</span> 
                <span>
                {p.describe}
                </span>
                <span>{autoComma(p.price)}</span>
            </JDalign>
            </JDtypho>
            {p.sub.map(subp => (
            <JDalign mb="small" flex={{ between: true }}>
                <div>└{subp.title}</div>
                <div>
                {subp.price ? (
                    <JDalign flex={{
                        around: true
                    }}>
                    <JDtypho mr="normal">+</JDtypho>
                    {p.describe && <JDtypho>{p.describe}</JDtypho>}
                    {autoComma(subp.price)}
                    </JDalign>
                ) : (
                    LANG("free")
                )}
                </div>
            </JDalign>
            ))}
        </div>
        </div>
    ))}
    <JDalign
        flex={{
        end: true
        }}
        className="calculateViewer__result"
    >
        <JDalign
        flex={{
            between: true
        }}
        className="calculateViewer__result-title"
        >
        <JDtypho size="h3">{LANG("sum_price")}</JDtypho>{" "}
        <JDtypho size="h3">
            {total === 0 ? LANG("free") : autoComma(total)}
        </JDtypho>
        </JDalign>
    </JDalign>
    </div>
);
};
  


interface IProp extends ICalculaterProp{
    modalHook:IUseModal;
    modalProp: JDmodalConfigProps
}


export const CalculateViewerModal:React.FC<IProp> = ({modalHook,modalProp,products}) => {
    return <JDmodal {...modalProp} {...modalHook}>
        <CalculateViewer products={products}/>
    </JDmodal>

}

export default CalculateViewer;
