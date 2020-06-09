import React from "react";
import { IResvContext } from "../pages/declare";
interface IProps {
    type: "use" | "personal";
    resvContext: IResvContext;
}
declare const AgreeBlock: React.FC<IProps>;
export default AgreeBlock;
