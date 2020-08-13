import React from "react";
import { JDmodal, IUseModal, JDtypho, JDdayPicker, JDmodalConfigProps, JDalign, toNumber } from "@janda-com/front"
import { arraySum } from "@janda-com/front";
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
            <JDtypho>
            <JDalign
                flex={{
                between: true
                }}
                className="calculateViewer__mainLine"
            >
                <span className="calculateViewer__mainLiTitle">{p.title}</span> 
                <span className="calculateViewer__mainLiDesc">
                    {p.describe}
                </span>
                <span className="calculateViewer__mainLiPrice">{autoComma(p.price)}</span>
            </JDalign>
            </JDtypho>
            {p.sub.map(subp => (
                <div className="calculateViewer__subDetail">
                {subp.price ? (
                    <JDalign className="calculateViewer__subLine"  flex={{ between: true,vCenter:true }}>
                    <div className="calculateViewer__subTitle">└{subp.title}</div>
                    {subp.describe && <JDtypho className="calculateViewer__describe">{subp.describe}</JDtypho>}
                    <JDtypho mr="no">+{autoComma(subp.price)}</JDtypho>
                    </JDalign>

                ) : (
                <JDalign flex={{
                    between:true
                }} className="calculateViewer__subTitle">└{subp.title} {LANG("free")}</JDalign>
                )}
                </div>
            ))}
        </div>
        </div>
    ))}
    <JDalign
        flex={{
            between: true
        }}
        className="calculateViewer__result"
        >
        <JDtypho size="h6" mb="no">총금액</JDtypho>
        <JDtypho  color={"error"} size="h6" mb="no">
            {total === 0 ? LANG("free") : autoComma(total)}
        </JDtypho>
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
