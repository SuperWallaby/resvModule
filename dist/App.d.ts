/// <reference types="react" />
import "./scss/App.scss";
import { RESV_INIT_OPTION } from ".";
export declare const JDlangsSet: any;
export declare const JDlang: (lang: "kr" | "en", key: string, key2?: string | undefined) => any;
export declare let LANG: (key: string, key2?: string) => any;
export interface APP_PROP extends RESV_INIT_OPTION {
    publickey: string;
}
declare function App({ publickey, lang, route, ga_track }: APP_PROP): JSX.Element;
export default App;
