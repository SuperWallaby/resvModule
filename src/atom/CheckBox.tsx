import React from "react";
import "./CheckBox.scss";

interface IProps {
  checked: boolean;
  handleClick: any;
}

const CheckBoxMini: React.FC<IProps> = ({ checked, handleClick }) => {
  return (
    <div onClick={handleClick} className="checkBoxMini">
      {checked && "☺"}
    </div>
  );
};

export default CheckBoxMini;
