import React from "react";
import { JDalign } from "@janda-com/front";

interface IProp {}

const ErrorPage: React.FC<IProp> = () => {
  return (
    <JDalign text="center">
      <img src="https://s3.ap-northeast-2.amazonaws.com/booking.stayjanda.files/infographic/nopage.png" />
      <h3>문제가 발생 하였습니다.</h3>
      <h6>
        죄송합니다. 페이지에 문제가 생겼습니다. <br /> 뒤로가기를 눌러 주세요.
      </h6>
    </JDalign>
  );
};

export default ErrorPage;
