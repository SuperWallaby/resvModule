import React from "react";
import classNames from "classnames";
import { IDiv } from "@janda-com/front/src/types/interface";

interface IProps extends IDiv {
  checked: boolean;
  handleClick: any;
}

const CheckBoxMini: React.FC<IProps> = ({
  checked,
  className,
  handleClick,
}) => {
  const classes = classNames("checkBoxMini", className, {
    "checkBoxMini--checked": checked,
  });

  return (
    <div onClick={handleClick} className={classes}>
      {checked && "✓"}
    </div>
  );
};

export default CheckBoxMini;
