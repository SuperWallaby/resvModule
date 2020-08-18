import React, { useState, useEffect } from "react";
import { ApolloProvider, useQuery } from "react-apollo";
import client from "./apollo/apolloClient";
import { Toast, JDtypho } from "@janda-com/front";
import ReservationWrap from "./pages/ReservationWrap";
import kr from "./lang/kr";
import "./scss/App.scss";
import { RESV_INIT_OPTION } from ".";
import ReservationFind from "./pages/ReservationFind";
import ReactGA from "react-ga";
// @ts-ignore
import ErrorBound from "./ErrorBound";
import { getHouseForPublic } from "./types/api";
import { GET_HOUSE_FOR_PUBLIC } from "./apollo/queries";
import { queryDataFormater } from "@janda-com/front";
import { changePrimaryColor, getColorTag } from "./pages/helper";
import { useLang } from "./lang/lang"
import "./scss/App.scss";

export interface APP_PROP extends RESV_INIT_OPTION {
  publickey: string;
}

const { version } = require("../package.json");

function App({ publickey, lang, route, ga_track, sideShoudStatic }: APP_PROP) {
  const langHook = useLang(lang || "kr");
  const [step, setStep] = useState<"book" | "search">(route || "book");

  if (publickey.length > 10) sessionStorage.setItem("hpk", publickey);
  else sessionStorage.setItem("hk", publickey);


  const { data, loading } = useQuery<getHouseForPublic>(GET_HOUSE_FOR_PUBLIC, {
    client,
    skip: publickey === undefined,
  });

  const houseData =
    queryDataFormater(data, "GetHouseForPublic", "house", undefined) ||
    undefined;

  changePrimaryColor(getColorTag(houseData));

  const finishCallBack = () => {
    setStep("search");
  };

  useEffect(() => {
    if (ga_track)
      ReactGA.initialize(ga_track, { debug: true, alwaysSendToDefaultTracker: false }
      );
  }, [])

  return (
    <div className="App themeProvider">
      <ErrorBound>
        <ApolloProvider client={client}>
          {step === "book" && (
            <ReservationWrap
              houseData={houseData}
              loading={loading}
              sideShoudStatic={sideShoudStatic}
              finishCallBack={finishCallBack}
              publickey={publickey}
            />
          )}
          {step === "search" && (
            <ReservationFind
              callBackGoToBook={() => {
                setStep("book");
              }}
            />
          )}
        </ApolloProvider>
        <Toast />
        <div
          style={{
            display: "block",
            position: "fixed",
            left: "0%",
            bottom: "0%",
            zIndex: 999999,
          }}
          id="JDversion"
          className="JDtextColor--placeHolder"
        >
          <JDtypho
            style={{
              opacity: 0.5,
              color: "black"
            }}
            color="black"
            size="superTiny"
          >
            {version}
          </JDtypho>
        </div>
      </ErrorBound>
    </div>
  );
}

export default App;
