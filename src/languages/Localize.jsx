import LocalizedStrings from 'react-localization';
import stringsJson from "./languages.json";
import React from 'react';

export const strings = new LocalizedStrings(stringsJson);

export const LocalizeContext = React.createContext({
    strings,
    currentLanguage: "sr",
    setLanguage: () => {
    },
});

export const withLocalizeStrings = Component => {
    return props => {
        const {strings} = React.useContext(LocalizeContext);
        return <Component strings={strings} {...props}/>;
    };
};