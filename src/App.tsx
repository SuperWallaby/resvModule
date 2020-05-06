import React, { useState } from "react";
import { ApolloProvider } from "react-apollo";
import client from "./apollo/apolloClient";
import { Toast } from "@janda-com/front";
import ReservationWrap from "./pages/ReservationWrap";
import kr from "./lang/kr";
import "./App.scss";
import { RESV_INIT_OPTION } from ".";

export const JDlangsSet: any = {
  kr,
};

export const JDlang = (lang: "kr" | "en", key: string, key2?: string) => {
  if (!JDlangsSet[lang]) return "";
  if (!JDlangsSet[lang][key]) return "";
  if (key2) {
    if (!JDlangsSet[lang][key][key2]) return;
    return JDlangsSet[lang][key][key2];
  }
  return JDlangsSet[lang][key];
};

export let LANG: (key: string, key2?: string) => any = (key) => {
  return;
};

const useLang = (defaultLang: "kr" | "en") => {
  const [currentLang, setCurrentLang] = useState(defaultLang);

  LANG = JDlang.bind(JDlang, currentLang);

  return { currentLang, setCurrentLang };
};

export interface APP_PROP {
  publickey: string;
  initOp?: RESV_INIT_OPTION;
}

function App({ publickey, initOp }: APP_PROP) {
  const langHook = useLang(initOp?.lang || "kr");
  sessionStorage.setItem("hpk", publickey);

  return (
    <div className="App themeProvider">
      <ApolloProvider client={client}>
        <ReservationWrap publickey={publickey} />
      </ApolloProvider>
      <Toast />
    </div>
  );
}

export default App;
