import React from "react";
import { IUseDayPicker } from "@janda-com/front";
interface Iprops {
    dayPickerHook: IUseDayPicker;
    handleDateClick: any;
}
declare const DateSelecter: React.FC<Iprops>;
export default DateSelecter;
