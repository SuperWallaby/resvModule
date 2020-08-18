import { useState } from "react";
import kr from "./kr";

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

export let LANG: (key: string, key2?: string) => any = () => {
    return;
};

export const useLang = (defaultLang: "kr" | "en") => {
    const [currentLang, setCurrentLang] = useState(defaultLang);

    LANG = JDlang.bind(JDlang, currentLang);

    return { currentLang, setCurrentLang };
};
