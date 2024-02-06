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

    const changeShadowColor = useCallback((to: Mode) => {
        switch (to) {
            case Mode.Focus:
                document.documentElement.style.setProperty("--shadow-color", "#DC2626");
                break;
            case Mode.LongBreak:
                document.documentElement.style.setProperty("--shadow-color", "#16A34A");
                break;
            case Mode.ShortBreak:
                document.documentElement.style.setProperty("--shadow-color", "#4CACFF");
        }
    }, []);

    useEffect(() => {
        if (global.seconds <= 0) {
            skipHandle();
        }
        if (global.running) {
            const timer = setInterval(() => {
                setGlobalKey("seconds", global.seconds - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else {
            return;
        }
    }, [global.seconds, global.running]);

    useEffect(() => {
        changeShadowColor(global.mode);
    });

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
