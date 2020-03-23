import React from "react";
import "./SelectViewer.scss";
import { JDbutton } from "@janda-com/front";

interface IProps {}

const SelectViewer: React.FC<IProps> = () => {
  return (
    <div className="selectViewer">
      <div className="selectViewer__header"></div>
      <div className="selectViewer__calculater">
        <div className="selectViewer__calculaterBody"></div>
        <div className="selectViewer__calculaterTotal"></div>
        <JDbutton size="longLarge" thema="primary" />
      </div>
    </div>
  );
};

export default SelectViewer;
