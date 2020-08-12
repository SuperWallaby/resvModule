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

  const Check = () => <svg
  width="1em"
  height="1em"
  id="Layer_1"
  data-name="Layer 1"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 163.15 123.69"
>
  <title>Untitled-1</title>
  <polygon
    points="65.61 123.69 0 58.07 26.16 31.92 65.61 71.38 137 0 163.15 26.16 65.61 123.69"
    style={{ fill: "#fff" }}
  />
</svg>;

  return (
    <div onClick={handleClick} className={classes}>
      {checked && <Check/>}
    </div>
  );
};

export default CheckBoxMini;
