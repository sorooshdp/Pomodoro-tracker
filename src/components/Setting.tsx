import { createPortal } from "react-dom";
import classes from "./modal/Setting.module.css";
import React from "react";
import { useGlobal } from "../hooks/Global";

const Setting = ({ onClick }: { onClick: () => void }) => {
    const { global, setGlobalKey } = useGlobal();
    const changeFocusHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGlobalKey("focusLength", parseInt(event.target.value));
    };

    const changeLongBreakHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setLongBreakDelay(parseInt(event.target.value));
    };

    const changeShortBreakHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setShortBreakLength(parseInt(event.target.value));
    };

    const changeLongBreakLengthHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setLongBreakLength(parseInt(event.target.value));
    };

    const toggleNotificationsHandler = () => {
        setGlobalKey("notifications", !global.notifications);
    };

    const toggleAutoResumeHandler = () => {
        setGlobalKey("autoResume", !global.autoResume);
    };

    const container = document.getElementById("modal")!;
    return createPortal(
        <div className="absolute z-200 max-h-595px w-112 flex flex-col bg-stone-900 p-10px text-center top-1/20 left-1/3 transition-all rounded-lg overflow-scroll">
            <div className="flex justify-center items-center mt-2px mr-9px mb-35px ml-9px ">
                <h3 className="inline">Settings</h3>
            </div>
            <div className="flex justify-center items-center mt-2px mr-9px mb-35px ml-9px">
                <label htmlFor="chageTheme">Dark mode</label>
                {/* <input
                    type="checkbox"
                    id="changeTheme"
                    className="cursor-pointer appearance-none border-none h-5 m-0 relative w-8 bg-slate-500 rounded-lg "
                    checked={theme === "DARK" ? true : false}
                    onChange={toggleTheme}
                /> */}
            </div>
            <div className="flex justify-center items-center mt-2px mr-9px mb-35px ml-9px">
                <label htmlFor="focus-length">Focus length</label>
                <div className="flex">
                    <input
                        id="focus-length"
                        type="number"
                        className="appearance-none w-16 h-10 text-center"
                        value={global.focusLength}
                        onChange={changeFocusHandler}
                    />
                    <div className={classes.caretWrapper}>
                        <button className={classes.button}></button>
                        <button className={`${classes.button} ${classes.buttonDown}`}></button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center mt-2px mr-9px mb-35px ml-9px">
                <label htmlFor="long-break-delay">Long break delay</label>
                <div className={classes.inputWrapper}>
                    <input
                        id="long-break-delay"
                        type="number"
                        className={classes.input}
                        value={global.countToLongBreak}
                        onChange={changeLongBreakHandler}
                    />
                    <div className={classes.caretWrapper}>
                        <button className={classes.button}></button>
                        <button className={`${classes.button} ${classes.buttonDown}`}></button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center mt-2px mr-9px mb-35px ml-9px">
                <label htmlFor="short-break-length">Short break length</label>
                <div className={classes.inputWrapper}>
                    <input
                        type="number"
                        className={classes.input}
                        id="short-break-length"
                        value={global.shortBreakLength}
                        onChange={changeShortBreakHandler}
                    />
                    <div className={classes.caretWrapper}>
                        <button className={classes.button}></button>
                        <button className={`${classes.button} ${classes.buttonDown}`}></button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center mt-2px mr-9px mb-35px ml-9px">
                <label htmlFor="long-break-length">Long break length</label>
                <div className={classes.inputWrapper}>
                    <input
                        type="number"
                        className={classes.input}
                        id="long-break-length"
                        value={global.longBreakLength}
                        onChange={changeLongBreakLengthHandler}
                    />
                    <div className={classes.caretWrapper}>
                        <button className={classes.button}></button>
                        <button className={`${classes.button} ${classes.buttonDown}`}></button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center mt-2px mr-9px mb-35px ml-9px">
                <label htmlFor="auto-resume">Auto resume timer</label>
                <input
                    type="checkbox"
                    id="auto-resume"
                    className={classes.checkbox}
                    checked={global.autoResume}
                    onChange={toggleAutoResumeHandler}
                />
            </div>
            <div className="flex justify-center items-center mt-2px mr-9px mb-35px ml-9px">
                <label htmlFor="notifications">Notifications</label>
                <input
                    type="checkbox"
                    id="notifications"
                    className={classes.checkbox}
                    checked={global.notifications}
                    onChange={toggleNotificationsHandler}
                />
            </div>
        </div>,
        container
    );
};

export default Setting;
