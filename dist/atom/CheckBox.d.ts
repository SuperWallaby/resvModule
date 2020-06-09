import React from "react";
import { IDiv } from "@janda-com/front/src/types/interface";
interface IProps extends IDiv {
    checked: boolean;
    handleClick: any;
}
declare const CheckBoxMini: React.FC<IProps>;
export default CheckBoxMini;
