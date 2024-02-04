import {  useState , useContext, ReactNode} from "react";
import React from "react";
import { dark, light } from "../theme";

type UIContextObj = {
    theme: "DARK" | "LIGHT";
    toggleTheme : () => void
};

export const UIContext = React.createContext<UIContextObj> ({
    theme : 'DARK',
    toggleTheme : () => {}
})

export const useTheme = (): UIContextObj => {
    const context = useContext(UIContext);
    if (!context) {
      throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
  };

/**
 * this context stores information related to ui like: theme
 */
const UIContextProvider: React.FC<{children : ReactNode }> = (props) => {
    const [theme, setTheme] = useState<UIContextObj["theme"]>("DARK");

    const toggleThemeHandler = ( ) => {
        if( theme === "DARK" ) {
            document.documentElement.style.setProperty('--background-color', light['--background-color']);
            document.documentElement.style.setProperty('--text-color', light['--text-color']);
            document.documentElement.style.setProperty('--dark-color', light['--dark-color']);
            document.documentElement.style.setProperty('--light-color', light['--light-color']);
            document.documentElement.style.setProperty('--secondary-color', light['--secondary-color']);
        } else {
            document.documentElement.style.setProperty('--background-color', dark['--background-color']);
            document.documentElement.style.setProperty('--text-color', dark['--text-color']);
            document.documentElement.style.setProperty('--dark-color', dark['--dark-color']);
            document.documentElement.style.setProperty('--light-color', dark['--light-color']);
            document.documentElement.style.setProperty('--secondary-color', dark['--secondary-color']);
        }
        setTheme((prevTheme) => (prevTheme === "DARK" ? "LIGHT" : "DARK"));
    }

    const contextValue : UIContextObj= {
        theme : theme,
        toggleTheme: toggleThemeHandler
    }

    return(
        <UIContext.Provider value={ contextValue }>
            {props.children}
        </UIContext.Provider>
    )
};

export default UIContextProvider