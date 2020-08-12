import React from "react";
import { IResvContext } from "../pages/declare";
interface IProps {
    resvContext: IResvContext;
    handleDoResvBtn: () => void;
}
declare const PrevSelectViewer: React.FC<IProps>;
export default PrevSelectViewer;
