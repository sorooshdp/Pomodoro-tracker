import React, { useContext, useState,SetStateAction, Dispatch } from "react";

type timerContextObj = {
    focusLength: number;
    countToLongBreak: number;
    shortBreakLength: number;
    longBreakLength: number;
    autoResume: boolean;
    notifications: boolean;
    setFocusLength : Dispatch<SetStateAction<number>>;
    setLongBreakDelay : Dispatch<SetStateAction<number>>;
    setShortBreakLength : Dispatch<SetStateAction<number>>;
    setLongBreakLength : Dispatch<SetStateAction<number>>;
    toggleAutoResume : Dispatch<SetStateAction<boolean>>;
    toggleNotifications : Dispatch<SetStateAction<boolean>>;
};

export const timerContext = React.createContext<timerContextObj>({
    focusLength: 25,
    countToLongBreak: 4,
    shortBreakLength: 5,
    longBreakLength: 15,
    autoResume: false,
    notifications: true,
    setFocusLength : () => {},
    setLongBreakDelay : () => {},
    setShortBreakLength : () => {},
    setLongBreakLength : () => {},
    toggleAutoResume : () => {},
    toggleNotifications : () => {},
});

export const useTimer = (): timerContextObj => {
    const context = useContext(timerContext);

    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

/**
 * @description this component saves infomation related to timer: focus length, pomodoros until
 * long break, short break length, long break length, Auto resume timer, sound, notification
 * and other timer related information
 */
const TimerContextProvider: React.FC<{children : React.ReactNode }> = (props) => {
    const [focusLength, setFocusLength] = useState<number>(25);
    const [countToLongBreak, setCountToLongBreak] = useState<number>(4);
    const [shortBreakLength, setShortBreakLength] = useState<number>(5);
    const [longBreakLength, setLongBreakLength] = useState<number>(15);
    const [autoResume, setAutoResume] = useState<boolean>(false);
    const [notification, setNotification] = useState<boolean>(true);
    

    const contextValue: timerContextObj = {
        focusLength: focusLength,
        countToLongBreak: countToLongBreak,
        shortBreakLength: shortBreakLength,
        longBreakLength: longBreakLength,
        autoResume: autoResume,
        notifications: notification,
        setFocusLength : setFocusLength,
        setLongBreakDelay : setCountToLongBreak,
        setShortBreakLength : setShortBreakLength,
        setLongBreakLength : setLongBreakLength,
        toggleAutoResume : setAutoResume,
        toggleNotifications : setNotification
    };

    return (
        <timerContext.Provider value={contextValue}>
            {props.children}
        </timerContext.Provider>
    );
};

export default TimerContextProvider;
