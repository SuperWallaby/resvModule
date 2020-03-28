import React, { Fragment } from "react";
import moment from "moment";
import { IUseDayPicker, JDicon, JDtypho } from "@janda-com/front";
import "./DateSelecter.scss";
import { JDalign } from "@janda-com/front";
import { LANG } from "../App";

interface Iprops {
  dayPickerHook: IUseDayPicker;
  handleDateClick: any;
}

const DateSelecter: React.FC<Iprops> = ({
  dayPickerHook,
  handleDateClick,
  ...props
}) => {
  const dateRender = (date: Date = new Date()) => {
    return (
      <JDalign
        flex={{
          vCenter: true
        }}
        mr="normal"
      >
        <JDicon mr="normal" icon="addCircle" />
        {moment(date).format("YYYY-MM-DD")}
      </JDalign>
    );
  };

  const { from, to } = dayPickerHook;
  const dateDiff = Math.abs(
    moment(from || undefined).diff(to || undefined, "d")
  );

  return (
    <JDtypho weight={600} className="dateSelecter">
      <div className="dateSelecter__inner">
        <JDalign
          flex={{
            vCenter: true,
            between: true
          }}
        >
          <JDalign
            flex={{
              vCenter: true
            }}
            onClick={handleDateClick}
            {...props}
          >
            {dateRender(from || undefined)}
            <JDtypho mr="normal">~</JDtypho>
            {dateRender(to || undefined)}
          </JDalign>
          {dateDiff ? (
            <JDtypho weight={300}>
              {dateDiff}
              {LANG("sleep_unit")}
              {dateDiff + 1}
              {LANG("day_unit")}
            </JDtypho>
          ) : (
              <span />
            )}
        </JDalign>
      </div>
    </JDtypho>
  );
};

export default DateSelecter;