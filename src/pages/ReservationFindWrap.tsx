import React from "react";
import ResvFinder from "./ReservationFind";

export interface IProps {}

const ReservationFindWrap: React.FC<IProps> = () => {
  return (
    <div>
      <ResvFinder />
    </div>
  );
};

export default ReservationFindWrap;
