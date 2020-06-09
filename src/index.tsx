import React from "react";
import ReactDOM from "react-dom";
import App, { APP_PROP } from "./App";
import * as serviceWorker from "./serviceWorker";

export type TRoute = "book" | "search";

export interface RESV_INIT_OPTION {
  lang?: "kr" | "en";
  route?: TRoute;
}

const defaultInitOp: RESV_INIT_OPTION = {
  lang: "kr",
  route: "book",
};

class JD_RESV implements APP_PROP {
  publickey: string;
  initOp: RESV_INIT_OPTION;

  constructor(pbk: string, options?: RESV_INIT_OPTION) {
    this.publickey = pbk;
    this.initOp = options || defaultInitOp;
  }

  start(initOp?: RESV_INIT_OPTION) {
    ReactDOM.render(
      <App publickey={this.publickey} {...this.initOp} {...initOp} />,
      document.getElementById("JD_RESV_PAGE")
    );
  }
}

if (process.env.NODE_ENV === "development") {
  const TEST_PUBLICK_KEY = "163105a1-6104-36d5-8383-7d3a0320bd39";
  const jdmoudle = new JD_RESV(TEST_PUBLICK_KEY);

  jdmoudle.start();
}

// @ts-ignore
window.JDresv = JD_RESV;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
