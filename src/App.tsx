import React, { useState } from "react";
import { ApolloProvider } from "react-apollo";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import client from "./apollo/apolloClient";
import { Toast } from "@janda-com/front";
import ReservationWrap from "./pages/ReservationWrap";
import kr from "./lang/kr";
import "./App.scss";

export const JDlangsSet: any = {
  kr
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

export let LANG: (key: string, key2?: string) => any = key => {
  return;
};

const useLang = (defaultLang: "kr" | "en") => {
  const [currentLang, setCurrentLang] = useState(defaultLang);

  LANG = JDlang.bind(JDlang, currentLang);

  return { currentLang, setCurrentLang };
};

const TEST_PUBLICK_KEY = "0dcf581e-78e5-6e8d-7b26-38797196b21d";

function App({ publickey }: any) {
  const langHook = useLang((localStorage.getItem("LastLang") as any) || "kr");

  sessionStorage.setItem("hpk", TEST_PUBLICK_KEY);

  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route
              render={() => <ReservationWrap publickey={TEST_PUBLICK_KEY} />}
            />
          </Switch>
        </Router>
      </ApolloProvider>
      <Toast />
    </div>
  );
}

export default App;
