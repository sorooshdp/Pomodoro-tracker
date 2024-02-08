import { memo, useCallback, useEffect } from "react";
import { useGlobal } from "../hooks/Global";
import Clock from "./Clock";
import Controls from "./Controls";
import PomodoroMode from "./PomodoroMode";
import { shadowHandle, titleHandle } from "../utils/lib";

export enum Mode {
    Focus,
    LongBreak,
    ShortBreak,
}

const Timer = memo(() => {
    const { global, setGlobalKey } = useGlobal();

    useEffect(() => {
        if (global.seconds <= 0) {
            skipHandle();
        }
        if (global.running) {
            const timer = setInterval(() => {
                const now = Date.now();

                if (now - global.lastTick >= 1000) {
                    setGlobalKey("lastTick", global.lastTick + 1000);
                    setGlobalKey("seconds", global.seconds - 1);
                    shadowHandle(true, global, global.mode);
                    document.title = titleHandle(global.seconds - 1, global.mode);
                }
            }, 50);

            return () => clearInterval(timer);
        }
    }, [global.seconds, global.running, global.mode]);

    const resetTimer = useCallback((to: Mode) => {
        setGlobalKey("running", false);
        shadowHandle(false, global, to);
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
    }, []);

    const skipHandle = useCallback(() => {
        let nextMode: Mode;
        switch (global.mode) {
            case Mode.Focus:
                if (global.countToLongBreak <= 0) {
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
    }, [global.countToLongBreak, global.mode, resetTimer]);

    return (
        <div className="flex flex-col items-center justify-center">
            <PomodoroMode />
            <Clock seconds={global.seconds} />
            <Controls skipHandle={skipHandle} />
        </div>
    );
});

export default Timer;
