import { memo, useCallback, useEffect } from "react";
import { useGlobal } from "../hooks/Global";
import Clock from "./Clock";
import Controls from "./Controls";
import PomodoroMode from "./PomodoroMode";

export enum Mode {
    Focus,
    LongBreak,
    ShortBreak,
}

const Timer = memo(() => {
    const { global, setGlobalKey } = useGlobal();

    const changeShadowColor = useCallback(
        (to: Mode | "STOP") => {
            const index = document.documentElement.style;
            console.log(global.seconds);
            switch (to) {
                case Mode.Focus:
                    index.setProperty("--shadow-color", "#DC2626");
                    index.setProperty(
                        "--shadow-length",
                        `${(((global.focusLength - global.seconds) * 100) / global.focusLength) * 4}px`
                    );
                    break;
                case Mode.LongBreak:
                    index.setProperty("--shadow-color", "#16A34A");
                    index.setProperty(
                        "--shadow-length",
                        `${(((global.longBreakLength - global.seconds) * 100) / global.longBreakLength) * 4}px`
                    );
                    break;
                case Mode.ShortBreak:
                    index.setProperty("--shadow-color", "#4CACFF");
                    index.setProperty(
                        "--shadow-length",
                        `${(((global.shortBreakLength - global.seconds) * 100) / global.shortBreakLength) * 4}px`
                    );
                    break;
                case "STOP":
                    index.setProperty("--shadow-length", "0px");
                    index.setProperty("--shadow-color", "#121212");
            }
        },
        [global.seconds, global.focusLength]
    );

    useEffect(() => {
        if (global.seconds <= 0) {
            skipHandle();
        }
        if (global.running) {
            const timer = setInterval(() => {
                setGlobalKey("seconds", global.seconds - 1);
                changeShadowColor(global.mode);
            }, 1000);

            return () => clearInterval(timer);
        } else {
            changeShadowColor("STOP");
            return;
        }
    }, [global.seconds, global.running, global.mode]);

    const resetTimer = useCallback(
        (to: Mode) => {
            setGlobalKey("running", false);
            changeShadowColor(global.mode);
            switch (to) {
                case Mode.Focus:
                    setGlobalKey("seconds", global.focusLength);
                    break;
                case Mode.LongBreak:
                    setGlobalKey("seconds", global.longBreakLength);
                    break;
                case Mode.ShortBreak:
                    setGlobalKey("seconds", global.shortBreakLength);
                    break;
            }
        },
        [changeShadowColor, global.mode]
    );

    const skipHandle = useCallback(() => {
        let nextMode: Mode;
        switch (global.mode) {
            case Mode.Focus:
                if (global.countToLongBreak === 0) {
                    nextMode = Mode.LongBreak;
                    setGlobalKey("countToLongBreak", 4);
                } else {
                    nextMode = Mode.ShortBreak;
                }
                setGlobalKey("mode", nextMode);
                break;
            case Mode.LongBreak:
            case Mode.ShortBreak:
                nextMode = Mode.Focus;
                setGlobalKey("mode", nextMode);
                setGlobalKey("countToLongBreak", global.countToLongBreak - 1);
                break;
            default:
                // UNREACHABLE
                nextMode = Mode.Focus;
        }
        resetTimer(nextMode);
        changeShadowColor(nextMode);
    }, [global.countToLongBreak, global.mode, resetTimer, changeShadowColor]);

    return (
        <div className="flex flex-col items-center justify-center">
            <PomodoroMode changeShadow={changeShadowColor} />
            <Clock seconds={global.seconds} />
            <Controls skipHandle={skipHandle} />
        </div>
    );
});

export default Timer;
