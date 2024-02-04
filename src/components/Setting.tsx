import ReactDOM from "react-dom";
import classes from "./modal/Setting.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faXmark,
    faCaretUp,
    faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "./ui-context";
import { useTimer } from "./timer-context";
import React from "react";

const Setting: React.FC<{ onClick: () => void }> = (props) => {
    console.log("setting re-render")
    const { theme, toggleTheme } = useTheme();
    const {
        focusLength,
        countToLongBreak,
        shortBreakLength,
        longBreakLength,
        autoResume,
        notifications,
        setFocusLength,
        setLongBreakDelay,
        setLongBreakLength,
        setShortBreakLength,
        toggleAutoResume,
        toggleNotifications,
    } = useTimer();

    const changeFocusHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFocusLength(parseInt(event.target.value));
    };

    const changeLongBreakHandler = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setLongBreakDelay(parseInt(event.target.value));
    };

    const changeShortBreakHandler = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setShortBreakLength(parseInt(event.target.value));
    };

    const changeLongBreakLengthHandler = ( event : React.ChangeEvent<HTMLInputElement>) => {
        setLongBreakLength( parseInt( event.target.value) )
    }
    
     const toggleNotificationsHandler = () => {
        toggleNotifications((prevState) => !prevState)
     }

     const toggleAutoResumeHandler = () => {
        toggleAutoResume((prevState) => !prevState)
     }

    console.log(focusLength);

    const container = document.getElementById("modal")!;
    return ReactDOM.createPortal(
        <div className={classes.setting}>
            <div className={classes.flex}>
                <h3 className={classes.header}>Settings</h3>
                <FontAwesomeIcon
                    icon={faXmark}
                    className={classes.XMark}
                    onClick={props.onClick}
                />
            </div>
            <div className={classes.flex}>
                <label htmlFor="chageTheme">Dark mode</label>
                <input
                    type="checkbox"
                    id="changeTheme"
                    className={classes.checkbox}
                    checked={theme === "DARK" ? true : false}
                    onChange={toggleTheme}
                />
            </div>
            <div className={classes.flex}>
                <label htmlFor="focus-length">Focus length</label>
                <div className={classes.inputWrapper}>
                    <input
                        id="focus-length"
                        type="number"
                        className={classes.input}
                        value={focusLength}
                        onChange={changeFocusHandler}
                    />
                    <div className={classes.caretWrapper}>
                        <button className={classes.button}>
                            <FontAwesomeIcon icon={faCaretUp} />
                        </button>
                        <button
                            className={`${classes.button} ${classes.buttonDown}`}
                        >
                            <FontAwesomeIcon icon={faCaretDown} />
                        </button>
                    </div>
                </div>
            </div>
            <div className={classes.flex}>
                <label htmlFor="long-break-delay">Long break delay</label>
                <div className={classes.inputWrapper}>
                    <input
                        id="long-break-delay"
                        type="number"
                        className={classes.input}
                        value={countToLongBreak}
                        onChange={changeLongBreakHandler}
                    />
                    <div className={classes.caretWrapper}>
                        <button className={classes.button}>
                            <FontAwesomeIcon icon={faCaretUp} />
                        </button>
                        <button
                            className={`${classes.button} ${classes.buttonDown}`}
                        >
                            <FontAwesomeIcon icon={faCaretDown} />
                        </button>
                    </div>
                </div>
            </div>
            <div className={classes.flex}>
                <label htmlFor="short-break-length">Short break length</label>
                <div className={classes.inputWrapper}>
                    <input
                        type="number"
                        className={classes.input}
                        id="short-break-length"
                        value={shortBreakLength}
                        onChange={changeShortBreakHandler}
                    />
                    <div className={classes.caretWrapper}>
                        <button className={classes.button}>
                            <FontAwesomeIcon icon={faCaretUp} />
                        </button>
                        <button
                            className={`${classes.button} ${classes.buttonDown}`}
                        >
                            <FontAwesomeIcon icon={faCaretDown} />
                        </button>
                    </div>
                </div>
            </div>
            <div className={classes.flex}>
                <label htmlFor="long-break-length">Long break length</label>
                <div className={classes.inputWrapper}>
                    <input
                        type="number"
                        className={classes.input}
                        id="long-break-length"
                        value={longBreakLength}
                        onChange={changeLongBreakLengthHandler}
                    />
                    <div className={classes.caretWrapper}>
                        <button className={classes.button}>
                            <FontAwesomeIcon icon={faCaretUp} />
                        </button>
                        <button
                            className={`${classes.button} ${classes.buttonDown}`}
                        >
                            <FontAwesomeIcon icon={faCaretDown} />
                        </button>
                    </div>
                </div>
            </div>
            <div className={classes.flex}>
                <label htmlFor="auto-resume">Auto resume timer</label>
                <input
                    type="checkbox"
                    id="auto-resume"
                    className={classes.checkbox}
                    checked={autoResume}
                    onChange={toggleAutoResumeHandler}
                />
            </div>
            <div className={classes.flex}>
                <label htmlFor="notifications">Notifications</label>
                <input
                    type="checkbox"
                    id="notifications"
                    className={classes.checkbox}
                    checked={notifications}
                    onChange={toggleNotificationsHandler}
                />
            </div>
        </div>,
        container
    );
};

export default Setting;
